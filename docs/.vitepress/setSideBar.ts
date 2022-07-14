import fs from "fs"
import { resolve } from "path"
import { SidebarGroup, SidebarItem } from "./theme/types/sidebar"

const DIR_PATH = resolve(__dirname, '../')
const WHITE_LIST = ['index.md', '.vitepress']


const isDirectory = (path: string): boolean => fs.lstatSync(path).isDirectory()

const intersections = <T>(arr1: T[], arr2: T[]): T[] => Array.from(new Set(arr1.filter(item => !new Set(arr2).has(item))))


const genList = (params: string[], path: string, pathname: string): SidebarGroup[] => {

    const res: SidebarGroup[] = []

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