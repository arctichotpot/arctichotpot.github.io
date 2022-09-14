import fs from "fs"
import { resolve } from "path"
import { SidebarItem } from "./theme/types/sidebar"

// 文件根目录
const DIR_PATH = resolve(__dirname, '../')
// 白名单,过滤不是文章的文件和文件夹
const WHITE_LIST = ['index.md', '.vitepress']

// 判断是否是文件夹
const isDirectory = (path: string): boolean => fs.lstatSync(path).isDirectory()
// 是否包含
const intersections = <T>(arr1: T[], arr2: T[]): T[] => Array.from(new Set(arr1.filter(item => !new Set(arr2).has(item))))

// 生成列表

// params :文件夹列表 path:路径 pathname 构建地址的路径
const genList = (params: string[], path: string, pathname: string) => {

    const res: any[] = []

    for (let file in params) {

        const dir = resolve(path, params[file])
        const is = isDirectory(dir)

        if (is) {
            const files = fs.readdirSync(dir)
            res.push({
                text: params[file],
                collapsible: true,
                items: genList(files, dir, `${pathname}/${params[file]}`) as SidebarItem[]
            })
        } else {
            const name = params[file].split('.')[0]
            res.push({
                text: name,
                link: `${pathname}/${name}`
            })
        }
    }
    return res
}


export default (pathname: string) => {

    const dirPath = resolve(DIR_PATH, pathname)
    const files = fs.readdirSync(dirPath)
    const items = intersections(files, WHITE_LIST)

    return genList(items, dirPath, pathname)
}