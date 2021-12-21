const { FILE } = require('dns')
const fs = require('fs')
const path = require('path')

let template = (title, link) => `- [${title}](./${link})  
`
const notGenerateList = ['.git', 'index.js', 'package.json', 'README.md']
const rootDir = fs.readdirSync(__dirname)

const GenerateArticleDir = () => {
  const list = rootDir.filter((_) => !notGenerateList.includes(_))

  for (let dir of list) {
    const res = fs.readdirSync(path.resolve(__dirname, dir))
    fs.writeFileSync(`${__dirname}/${dir}/readme.md`, '')
    if (res.length > 0) {
      let content = []
      res.forEach((file) => {
        if (file !== 'readme.md') {
          fs.appendFileSync(
            `${__dirname}/${dir}/readme.md`,
            template(file, file)
          )
        }
      })
    }
  }
}

GenerateArticleDir()
