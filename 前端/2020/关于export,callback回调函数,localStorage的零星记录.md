# 关于 export,callback 回调函数,localStorage 的零星记录

<a name="article-title"></a>

# export deault

```javascript
export 用于导出函数或者变量,将他们暴露在外面
可以导出:
export const str="helloworld",
export const str2="iamdog",
export const str3="hahaha"
格式也可以是export default{
str,str2,str3}
在应用时需要用打括号{}引入
```

<a name="gwDOO"></a>

# (相对路径与绝对路径)

相对路径:<br />./代表他的所在目录,<br />../代表父级目录<br />../../代表 父级目录 的 父级目录<br />/代表根目录<br />绝对路径<br />比如:http://www.baidu.com/image/img1.jpg
<a name="zdsca"></a>

# callback 回调函数

callback 回调函数本质上是一个函数调用另一个函数<br />在 JavaScript 中，回调函数具体的定义为：函数 A 作为参数(函数引用)传递到另一个函数 B 中，并且这个函数 B 执行函数 A。我们就说函数 A 叫做回调函数。如果没有名称(函数表达式)，就叫做匿名回调函数。<br />因此 callback 不一定用于异步，一般同步(阻塞)的场景下也经常用到回调，比如要求执行某些操作后执行回调函数。<br />简单的例子:<br />

```javascript
function fun1(callback) {
  const num = 12
  callback(num)
}
fun1((num) => {
  console.log(num)
})
//打印结果是   22
```

<a name="eiseK"></a>

# 什么是 localStorage

对浏览器来说，使用 Web Storage 存储键值对比存储 Cookie 方式更直观，而且容量更大，它包含两种：localStorage 和 sessionStorage

1. sessionStorage（临时存储） ：为每一个数据源维持一个存储区域，在浏览器打开期间存在，包括页面重新加载
1. localStorage（长期存储） ：与 sessionStorage 一样，但是浏览器关闭后，数据依然会一直存在

所以上次使用 cookie 的时候就遇到了一个坑,设置后马上访问 session 会获取不到,蛋疼,还需要刷新一下,原因是:<br />当我们首次访问设置 Cookie 的页面时，服务器会把设置的 Cookie 值通过响应头发送过来，告诉浏览器将 cookie 存储的本地相应文件夹中（注意:第一次访问时本地还没有存储 Cookie,所以此时获取不到值）;<br />当第二次访问(或在进行 cookie 设置后,过期前所有的访问)时，请求头信息你中都会把 Cookie 值携带。(百度到的,暂时还没理解透彻,先搬过来).
<a name="KRTYZ"></a>

## 保存

```javascript
//对象

const info = { name: 'hou', age: 24, id: '001' }

//字符串

const str = 'haha'

localStorage.setItem('hou', JSON.stringify(info))

localStorage.setItem('zheng', str)
```

<a name="0HtEC"></a>

## 获取

```javascript
var data1 = JSON.parse(localStorage.getItem('hou'))

var data2 = localStorage.getItem('zheng')
```

<a name="aSkNX"></a>

## 删除

```javascript
//删除某个

localStorage.removeItem('hou')
//删除所有
localStorage.clear()
```

<a name="aYQto"></a>

## 监听

```javascript
Storage 发生变化（增加、更新、删除）时的 触发，同一个页面发生的改变不会触发，只会监听同一域名下其他页面改变 Storage
window.addEventListener('storage', function (e) {
　　console.log('key', e.key); console.log('oldValue', e.oldValue);
　　console.log('newValue', e.newValue); console.log('url', e.url);
})
```

<a name="BwVfP"></a>

## vue 中的使用

根据我的需求来的一个默认记住上次选择的,很简单<br />添加数据的时候,下次添加默认记住我上次的选择<br />所以,在添加或者提交的时候存储值即可,<br />localStorage.setItem('projectId',me.workhourData.projectId+","+me.workhourData.projectManager);<br /> <br />在打开新建页面的时候获取一下就好了,只需要判断非空就行<br />

```javascript
//记住上次选中的审核人
if (localStorage.length > 0) {
  var mydata = localStorage.getItem('projectId')
  if (mydata != null) {
    var arr3 = mydata.split(',')
    if (arr3[0] == me.workhourData.projectId) {
      me.workhourData.projectManager = arr3[1]
    }
  }
}
```

<a name="Gg8L7"></a>

## 注意点

localStorage 有效期是永久的。一般的浏览器能存储的是 5MB 左右。sessionStorage api 与 localStorage 相同。<br />sessionStorage 默认的有效期是浏览器的会话时间（也就是说标签页关闭后就消失了）。<br />localStorage 作用域是协议、主机名、端口。（理论上，不人为的删除，一直存在设备中）<br />sessionStorage 作用域是窗口、协议、主机名、端口。<br />知道了这些知识点后，你的问题就很好解决了。<br />localStorage 是 window 上的。所以不需要写 this.localStorage，vue 中如果写 this，是指 vue 实例。会报错<br />

<a name="xhCnT"></a>

# HTML 加载过程

1. 加载 HTML-DOM 结构<br />2)CSS 和 JS<br />3)图片和多媒体<br />4)加载事件触发
