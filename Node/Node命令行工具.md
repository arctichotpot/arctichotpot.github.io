# Node 命令行工具

[项目地址](https://github.com/ZUOZHE1997/translation-cmd) 项目源码在最后面

参考文章
[从 1 到完美，用 node 写一个命令行工具](https://segmentfault.com/a/1190000016555129)

涉及到的 NPM 包

- chalk (让命令行的字符带上颜色)
- cheerio (解析 DOM)
- is-chinese (判断是不是中文)
- no-case ( 转换为单词之间有空格的小写字符串)
- ora (命令行加载中图标)
- request (Node 发送 request 请求)
- urlencode (将字符串以 URL 编码)

## 1. 前行提要

main 字段指定 package.json 中的出入口文件,如果安装命令行工具,则是由 bin 字段指定.

配置命令:

1. 这时命令名称为 tran,和包名相同

```json
{
  "name": "tran",
  "bin": "index.js"
}
```

2. 或单独指定命令名称

```json
{
  "name": "tran",
  "bin": {
    "yd": "index.js"
  }
}
```

然后在 index.js 文件中开头写入

```
#!/usr/bin/env node

// 让系统动态的去查找node来执行你的脚本文件。

```

然后将上面几个包安装好,就可以开始写了!

## 2. 写代码

#### 获取命令行输入的内容 😁

可以用 process.argv 获取

process.argv 属性会返回一个数组，其中包含当 Node.js 进程被启动时传入的命令行参数。 第一个元素是 process.execPath。 第二个元素是正被执行的 JavaScript 文件的路径。 其余的元素是任何额外的命令行参数。

文件开头,引入相关包

```JavaScript
const chalk = require('chalk')
const ora = require('ora')
const request = require('request')
const isChinese = require('is-chinese')
const urlencode = require('urlencode')
const noCase = require('no-case')
const cheerio = require('cheerio')

const spinner = ora('Loading...') // 定义一个文案,相当于加载中
```

```JavaScript

const word = process.argv.slice(2).join(' ') // 获取命令行输入的参数

```

在获取完参数后,先进行一个判断,如果参数为空就不再继续执行,此时把进程停掉

```JavaScript
if (!word) {
  spinner.fail(chalk.red('Please enter text')) // 这一步是显示报错,相当于加载失败
  process.exit() // 停掉进程
}

word = noCase.noCase(word) // 把单词转换为中间带空格的

```

#### 配置请求

```JavaScript
const isCh = isChinese(word)
```

判断是不是中文,是中文返回 true

```JavaScript
const url = () => {
  return isCh ? 'https://dict.youdao.com/w/eng/' : 'https://dict.youdao.com/w/'
}
```

第一个地址是汉译英,第二个地址是英译汉,对中文或英文进行判断切换地址

```JavaScript
const option = {
  url: url() + urlencode(word), //
}
```

配置请求地址,将 word 链接到 url 中

#### 解析 html

```javascript
request(option.url, (error, response, body) => {
...
  }
})
```

使用 request 发送请求,接下来就要用到 cheerio 包了,它可以在服务端用来解析 html

```JavaScript

 const $ = cheerio.load(body) // 加载html
    let result = $('#phrsListTab > .trans-container > ul') // 开始查找相关的id,class以及标签
      .text() // text()方法可以将其转换成字符串
      .replace(/\s+/g, '') // 用正则把空格处理掉

    if (!result) { // 有些情况是长句翻译,会没有上面的节点,所所以需要判断一下
      result = $(
        '#ydTrans > #fanyiToggle > .trans-container > p:nth-child(2)'
      ).text()
      // 取得长句翻译的节点
    }
    console.log(chalk.green(result))
```

### 本地运行

```
npm link
```

执行完命令后就可以 用 yd 加单词进行输入了 😁

![result.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd44133cc194477f9ffa030e7728b428~tplv-k3u1fbpfcp-watermark.image)

我的 bin 字段

```json
  "bin": {
    "yd": "index.js"
  },
```

源码奉上: index.js

```JavaScript
#!/usr/bin/env node

const chalk = require('chalk')
const ora = require('ora')
const request = require('request')
const isChinese = require('is-chinese')
const urlencode = require('urlencode')
const noCase = require('no-case')
const cheerio = require('cheerio')

const spinner = ora('Loading...')

let word = process.argv.slice(2).join(' ') // 获取命令行输入的参数

word = noCase.noCase(word)

if (!word) {
  spinner.fail(chalk.red('Please enter text'))
  process.exit() // Stop the process
}
console.log(word)

const isCh = isChinese(word)
const url = () => {
  return isCh ? 'https://dict.youdao.com/w/eng/' : 'https://dict.youdao.com/w/'
}

const option = {
  url: url() + urlencode(word),
}

spinner.start()

request(option.url, (error, response, body) => {
  if (error) {
    spinner.fail(chalk.red('ERROR'))
  } else {
    spinner.stop()

    const $ = cheerio.load(body)
    let result = $('#phrsListTab > .trans-container > ul')
      .text()
      .replace(/\s+/g, '')

    if (!result) {
      // console.log(
      //   $('#ydTrans > #fanyiToggle > .trans-container > p:nth-child(2)').text()
      // )
      result = $(
        '#ydTrans > #fanyiToggle > .trans-container > p:nth-child(2)'
      ).text()
    }
    console.log(chalk.green(result))
  }
})

```
