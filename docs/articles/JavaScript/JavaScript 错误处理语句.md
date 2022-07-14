# javascript 错误处理语句

- **try** 语句测试代码块的错误。
- **catch** 语句处理错误。
- **throw** 语句创建自定义错误。
- **finally** 语句在 try 和 catch 语句之后，无论是否有触发异常，该语句都会执行。

```javascript
//try语句通常搭配catch语句来使用
try {
...
}
catch{
...
}
//比如
try{
console.logg(123)//程序会在这里停止执行
}
catch{
console.log(321)//在上一句抛出异常后会执行 catch 中的语句,此时输出 321
}
  //321
//或者后面常常也会配合 finally 一起使用
try {
...
}
catch{
...
} finally{
...
}
//比如
try{
console.logg(123)//程序会在这里停止执行
}
catch{
console.log(321)//在上一句抛出异常后会执行 catch 中的语句,此时输出 321
}
finally{
console.log(456)
}
  //321
  //456
throw 语句
throw 语句允许我们创建自定义错误。
正确的技术术语是：创建或抛出异常（exception）。
//比如
throw hello

有时,try...catch...语句也会和throw语句一起使用
let a= 12
try{
  if(a==="") throw "值为空"
   if(isNaN(a)) throw "不是数字";
   a = Number(a);
if(a>10) throw "这个数字比10大"
  if (a<10) throw "这个数字比10小"
} catch(err){
console.log(err)
}

  //没有catch语句时,程序会中断,先执行finally语句,然后再抛出异常信息
  function cleansUp() {
  try {
    throw new Error('出错了……');
    console.log('此行不会执行');
  } finally {
    console.log('完成清理工作');
  }
}

cleansUp()
// 完成清理工作
// Uncaught Error: 出错了……
//    at cleansUp (<anonymous>:3:11)
//    at <anonymous>:10:1


  function idle(x) {
  try {
    console.log(x);
    return 'result';
  } finally {
    console.log('FINALLY');
  }
}

idle('hello')
// hello
// FINALLY
上面代码中，try代码块没有发生错误，而且里面还包括return语句，
但是finally代码块依然会执行。而且，这个函数的返回值还是result。

下面的例子说明，return语句的执行是排在finally代码之前，
只是等finally代码执行完毕后才返回。

var count = 0;
function countUp() {
  try {
    return count;
  } finally {
    count++;
  }
}

countUp()
// 0
count
// 1
上面代码说明，return语句里面的count的值，是在finally代码块运行之前就获取了。

下面是finally代码块用法的典型场景。

openFile();

try {
  writeFile(Data);
} catch(e) {
  handleError(e);
} finally {
  closeFile();
}
上面代码首先打开一个文件，然后在try代码块中写入文件，如果没有发生错误，
则运行finally代码块关闭文件；一旦发生错误，则先使用catch代码块处理错误，
再使用finally代码块关闭文件。

下面的例子充分反映了try...catch...finally这三者之间的执行顺序。

function f() {
  try {
    console.log(0);
    throw 'bug';
  } catch(e) {
    console.log(1);
    return true; // 这句原本会延迟到 finally 代码块结束再执行
    console.log(2); // 不会运行
  } finally {
    console.log(3);
    return false; // 这句会覆盖掉前面那句 return
    console.log(4); // 不会运行
  }

  console.log(5); // 不会运行
}

var result = f();
// 0
// 1
// 3

result
// false
上面代码中，catch代码块结束执行之前，会先执行finally代码块。

catch代码块之中，触发转入finally代码块的标志，不仅有return语句，还有throw语句。

function f() {
  try {
    throw '出错了！';
  } catch(e) {
    console.log('捕捉到内部错误');
    throw e; // 这句原本会等到finally结束再执行
  } finally {
    return false; // 直接返回
  }
}

try {
  f();
} catch(e) {
  // 此处不会执行
  console.log('caught outer "bogus"');
}

//  捕捉到内部错误
上面代码中，进入catch代码块之后，一遇到throw语句，就会去执行finally代码块，
其中有return false语句，因此就直接返回了，不再会回去执行catch代码块剩下的部分了。

try代码块内部，还可以再使用try代码块。

try {
  try {
    consle.log('Hello world!'); // 报错
  }
  finally {
    console.log('Finally');
  }
  console.log('Will I run?');
} catch(error) {
  console.error(error.message);
}
// Finally
// consle is not defined
上面代码中，try里面还有一个try。内层的try报错（console拼错了），
这时会执行内层的finally代码块，然后抛出错误，被外层的catch捕获。
```

<a name="b282dd92"></a>

# javascript 原生错误类型

<a name="62c6d174"></a>

### 1.SyntaxError 对象

<br />`SyntaxError`对象是解析代码时发生的语法错误。<br />

```javascript
// 变量名错误
var 1a;
// Uncaught SyntaxError: Invalid or unexpected token

// 缺少括号
console.log 'hello');
// Uncaught SyntaxError: Unexpected string
```

<br />上面代码的错误，都是在语法解析阶段就可以发现，所以会抛出`SyntaxError`。第一个错误提示是“token 非法”，第二个错误提示是“字符串不符合要求”。<br />

<a name="3e510f34"></a>

### 2.ReferenceError 对象

<br />`ReferenceError`对象是引用一个不存在的变量时发生的错误。<br />

```javascript
// 使用一个不存在的变量
unknownVariable
// Uncaught ReferenceError: unknownVariable is not defined
```

<br />另一种触发场景是，将一个值分配给无法分配的对象，比如对函数的运行结果赋值。<br />

```
// 等号左侧不是变量
console.log() = 1
// Uncaught ReferenceError: Invalid left-hand side in assignment
```

<br />上面代码对函数`console.log`的运行结果赋值，结果引发了`ReferenceError`错误。<br />

<a name="b3abb1af"></a>

### 3.RangeError 对象

<br />`RangeError`对象是一个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是`Number`对象的方法参数超出范围，以及函数堆栈超过最大值。<br />

```
// 数组长度不得为负数
new Array(-1)
// Uncaught RangeError: Invalid array length




```

函数堆栈超过最大值
<a name="172876bc"></a>

### ![](https://cdn.nlark.com/yuque/0/2020/png/514813/1605834029863-cadc914d-eafb-4fae-9112-c4bc8afdcd72.png#align=left&display=inline&height=281&margin=%5Bobject%20Object%5D&originHeight=281&originWidth=1084&size=0&status=done&style=none&width=1084)

<a name="rN5Ph"></a>

### 4.TypeError 对象

<br />`TypeError`对象是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用`new`命令，就会抛出这种错误，因为`new`命令的参数应该是一个构造函数。<br />

```
new 123
// Uncaught TypeError: number is not a func

var obj = {};
obj.unknownMethod()
// Uncaught TypeError: obj.unknownMethod is not a function
```

<br />上面代码的第二种情况，调用对象不存在的方法，也会抛出`TypeError`错误，因为`obj.unknownMethod`的值是`undefined`，而不是一个函数。<br />

<a name="b526cb3e"></a>

### 5.URIError 对象

<br />`URIError`对象是 URI 相关函数的参数不正确时抛出的错误，主要涉及`encodeURI()`、`decodeURI()`、`encodeURIComponent()`、`decodeURIComponent()`、`escape()`和`unescape()`这六个函数。<br />

```javascript
decodeURI('%2')
// URIError: URI malformed
```

<a name="0e2685d4"></a>

### 6.EvalError 对象

<br />`eval`函数没有被正确执行时，会抛出`EvalError`错误。该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。
