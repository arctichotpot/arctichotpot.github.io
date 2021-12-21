<a name="uFJIk"></a>
### 总结:
**let与var的区别**

1. var在javascript中是支持预解析的，而let不支持预解析
1. var可以重复定义同一个变量，但是let不可以
1. let可以形成块级作用域，在es6之前javascript只有函数作用域，没有块级作用域

**const与var的不同，以上三点完全适用const**<br />**const与let或是var还有两点不同

1. 用const定义常量必须赋值。不赋值的话，没有任何意思，所以报错
1. const是用来定义常量的，常量定义之后是不允许改变的


下文转自**思否**<br />作者:[**guanghua**](https://segmentfault.com/u/5guanghua)<br />**地址:**[https://segmentfault.com/a/1190000016491581](https://segmentfault.com/a/1190000016491581)<br />**let 是 ES6新增的变量类型，用来代替 var 的一些缺陷，跟 var 相比主要有以下区别：**
<a name="articleHeader1"></a>
### 1. let 使用块级作用域
在 ES6之前，ES5中js只有全局作用域和函数作用域，例如：
```javascript
if(true) {
   var a = 'name'
}
console.log('a',a) // name
```
作用域是一个独立的地盘，让变量不外泄出去，但是上例中的变量就外泄了出去，所以此时 JS 没有块级作用域的概念。
```javascript
var a = 1;
function fn() {
   var a = 2;
   console.log('fn',a);
}
console.log('global',a);
fn();
```
全局作用域就是最外层的作用域，如果我们写了很多行 JS 代码，变量定义都没有用函数包括，那么它们就全部都在全局作用域中。这样的坏处就是很容易冲突。<br />ES6中加入块级作用域之后：
```javascript
if(true) {
   let a = 'name'
}
console.log('a',a) // Uncaught ReferenceError: a is not defined
```
块作用域内用 let 声明的变量，在块外是不可见的，如果引用的话就会报错。
<a name="articleHeader2"></a>
### 2. let 约束了变量提升而不是没有变量提升
在 js 中变量和函数都会提升:
```javascript
function fn() {
   console.log('a',a);
   var a = 1;  // undefind
}
fn()
```
a其实已经在调用前被声明了，只是没有被初始化。JavaScript会把作用域里的所有变量和函数提到函数的顶部声明,相当于：
```javascript
function fn() {
   var a;
   console.log('a',a);
   a = 1;  // undefind
}
fn()
```
JavaScript会使用`undefined`缺省值创建变量a,事实上浏览器并没有把声明语句放到作用域的顶部，在编译阶段，控制流进入域，该域所有的变量和函数的声明先进入内存，文中代码的相对位置不会变动。<br />变量提升指的是变量声明的提升，不会提升变量的初始化和赋值。<br />并且函数的提升优先级大于变量的提升:
```javascript
function fn() {
            console.log('a', a);
            var a = 1;
            function a () {
                console.log('I am a function');
            }
        }
        fn() // ƒ a () {console.log('I am a function');}
```
在上例中， let 声明的变量的作用域之外引用该变量会报错，但是否可理解为 let 没有变量提升？
```javascript
let a = 'outside';
if(true) {
   console.log(a);//Uncaught ReferenceError: a is not defined
    let a = "inside";
}
```
报出错误 a 没有被定义，而不是引用了全局作用域里的 a，说明 let 声明的 a 也被提升了。<br />原因是 let 设计中的暂时性死区：<br />当前作用域顶部到该变量声明位置中间的部分，都是该let变量的死区，在死区中，禁止访问该变量。由此，我们给出结论，**let声明的变量存在变量提升， 但是由于死区我们无法在声明前访问这个变量。**
<a name="articleHeader3"></a>
### 3. let 禁止重复声明变量
使用 var 可以重复声明变量，但是 let 不允许在同一块作用域内重复声明同一个变量：
```javascript
function fn (){
   var a = 1;
   let a = 2;
   console.log(a); //SyntaxError
}
function fn (){
   let a = 1;
   let a = 2;
   console.log(a); //SyntaxError
}
function fn (a){
   let a = 2;
   console.log(a); //SyntaxError
}
```
上述代码会报语法错误；
<a name="articleHeader4"></a>
### 4. let不会成为全局对象的属性
我们在全局范围内声明一个变量时，这个变量自动成为全局对象的属性（在浏览器和`Node.js`环境下，这个全局对象分别是`window`和`global`)，但let是独立存在的变量，不会成为全局对象的属性：
```javascript
var a = 1;
console.log(window.a); //1
let b = 2;
console.log(window.b); // undefined
```
<a name="articleHeader5"></a>
### 5. const 声明的常量
以上 let 的规则同样适用于 const，但是跟 let 的区别是 const 声明的变量不能重新赋值，所以** const 声明的变量必须经过初始化**。
```javascript
const a = 1;
a = 2; // // Uncaught TypeError: Assignment to constant variable
const b; // Uncaught SyntaxError: Missing initializer in const declaration
```

