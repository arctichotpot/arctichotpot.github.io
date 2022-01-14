> 最近关于 Promise 看了好一些文章来阐述用途,再加上异步编程和 async 与 await 的用法弄的属实头大,但是看了好几遍之后感觉有点上道了,然后抓紧吧我知道的理解的记录下来了,我在这里只是阐述我对 Promise 和 async 的一些理解,关于 promise 和 async 的更多细节可以去查看阮一峰老师的[ES6 入门](https://es6.ruanyifeng.com/#docs/async),或者边城老师的[理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)

第一次写文章,可能会有语句不通顺或者有些理解错误的地方,也请多多指正,多多批评 😄
<a name="038zK"></a>

# 1.关于同步与异步

js 是单线程的,执行时只能等待前一个任务执行完毕才会执行下一个,但当前一个任务耗时过长时,就会发生阻塞,如果所有任务都是同步执行的话,就可能会造成浏览器卡顿等情况,所以那些执行时间很长的任务都应该异步来处理.关于异步模式编程的实现方式可以具体去参考阮一峰老师的[Javascript 异步编程的 4 种方法](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)
<a name="HYNup"></a>

# 2.Promise

第一次接触 Promise 时是去年学 Vue 的时用到的 Axios 库,里面的方法封装好了直接用的时候就是下面这种方法,后来在补习基础以及 ES6 是才知道这原来是用 Promise 封装的,但是碍于脑子笨没怎么理解,就还是只是会用,到前段时间在看的时候有那么一点点理解了.

```javascript
const data = {
  ...
};
services
    .getinfo(data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

```

Promise 是异步编程的一个解决方案,它有三个状态,`pending`（正在进行）、`fulfilled`（执行成功）和`rejected`（执行失败),而且只有两种状态:<br />A:正在进行==>执行成功<br />B:正在进行==>执行失败<br />且状态一旦发生变化,就不会再继续变了,成功就是成了,失败就是失败了,不会再去发生变化,这种结果会一直持续到任务结束.而且在执行过程中是无法取消的.<br />用法上 Promise 是一个构造函数,可以用`new`关键字来创建一个 Promise 对象,它接受两个函数参数,分别是`resolve`和`reject`,

```javascript
const myPromise = new Promise((resolve, reject) => {
  //接受两个参数 resolve, reject
  let num = 0
  setTimeout(() => {
    // 执行一个异步操作
    num = Math.random() * 10 // 生成一个随机数
    if (num > 5) {
      resolve(num) // 如果符合条件,就将Promise的状态从正在执行变为执行成功
    } else reject(num) // 如果不符合条件就会将状态由正在执行变为执行失败
  }, 2000)
})
myPromise
  .then((p) => {
    // then用于为Promise实例添加状态改变时的回调
    console.log(p)
  })
  .catch((e) => {
    // catch用于指定发生错误时的回调
    console.log(e)
  })
```

换句话说就是执行成功就在执行 then 方法,执行失败就去执行 catch 方法

```javascript
const myPromise = new Promise((resolve, reject) => {
  const num = Math.random() * 10
  if (num > 5) {
    resolve(num)
  } else reject(num)
})
myPromise
  .then((p) => {
    console.log(p)
  })
  .catch((e) => {
    console.log(e)
  })
console.log(1) // 注意!!
//执行结果是
//1
//7.696298823399228
```

这里的 myPromise 创建完后立即执行,但是因为是异步的, `then`方法指定的回调函数将在当前脚本所有同步任务执行完后才会执行,所以才会最后输出随机数<br />在网页的图片加载时,我们往往用的都是异步的,在执行 JS 时会去发送请求,等到主线程执行完了,图片也请求完了那么图片就会显示了.<br />我对`Promise`的理解的可能不是特别的深,所以请见谅.

Promise 的缺点<br />1、无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。<br />2、如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。<br />3、当处于`Pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
<a name="yAHl4"></a>

# 3.async 与 await

async 其实就是异步(asynchronous)

> `async`函数返回一个 Promise 对象，可以使用`then`方法添加回调函数。（它就是 Generator 函数的语法糖）
> 当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

```javascript
async function fun() {
  const result = 'helloworld'
  return result
}
fun()
```

运行结果:![image.png](https://cdn.nlark.com/yuque/0/2020/png/514813/1598275806132-fc054188-b534-4945-944b-76db1a378c57.png#align=left&display=inline&height=60&margin=%5Bobject%20Object%5D&name=image.png&originHeight=119&originWidth=383&size=5732&status=done&style=none&width=191.5)<br />可以发现,`async`函数返回的是一个 Promise 对象,而且 async 函数中的 return 的返回值可以做为 Promise 中 then 方法的回调的参数,如果抛出了异常,也可用 catch 方法来处理,且只有`async`函数内部的异步操作执行完，才会执行`then`方法指定的回调函数.<br />既然 async 返回了一个 Promise 对象,那么 await 的作用是什么呢?<br />正常情况下，`await`命令后面是一个 Promise 对象，返回该对象的结果.如果不是 Promise 对象，就直接返回对应的值.

```javascript
async function fun() {
  return await 'tom'
}
fun.then((p) => {
  console.log(p)
})

// tom
```

await 后面的值并不一定是一个 Promise 对象,也就是说,如果 await 后面的不是一个 Promise 对象,那么这个值就是要"等待"的处理结果<br />加了 await 之后,await 后面的语句都会变成同步的,按照顺序来执行语句,

```javascript
function myPromise(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num)
    }, 2000)
  })
}
async function fun() {
  let a = await myPromise(1)
  let b = await myPromise(2)
  let c = await myPromise(3)
  console.log(a, b, c)
  console.log('is end')
}
fun()
//1,2,3
//is end
```

<br />但是还有一点要注意是在 await 后面的异步语句如果抛出异常,就会时整个函数中断执行

```javascript
//把上面的代码进行修改
const myPromis = () => {
  return new Promise((resolve, reject) => {
    let num = 0
    setTimeout(() => {
      num = Math.random() * 10
      if (num > 5) {
        resolve(num)
      } else reject(num)
    }, 2000)
  })
}
async function fun() {
  let a = await myPromis()
  console.log(a)
  console.log('is end ')
}
fun()
```

执行结果:![image.png](https://cdn.nlark.com/yuque/0/2020/png/514813/1598278862573-d67a73cc-2ea9-4863-b4b3-50c590fef4e1.png#align=left&display=inline&height=161&margin=%5Bobject%20Object%5D&name=image.png&originHeight=322&originWidth=379&size=17466&status=done&style=none&width=189.5)<br />结果是 3.75 小于 5,执行 reject,抛出异常,但是可以用 try...catch...来改写`fun()`

```javascript
async function fun() {
  let a = 0
  try {
    a = await myPromis() // 大于5执行try语句
  } catch (e) {
    // 小于五抛出异常执行catch语句
    console.log(e)
    a = 100
  }
  console.log(a)
  console.log('is end ')
}
```

总的来说 ssync 与 await 就是可以简化 Promise,使其更直观的<br />但要注意 async 与 await 的使用:

- await 关键字必须位于 async 函数内部
- 不能在普通箭头函数中使用 await 关键字，需要在箭头函数前面添加 async

<br />
<br />
<br />
<br />
<br />
<br />
