## 关于 this

对于 this 的误解有两个:

- 认为`this`指向的对象是自己
- 是`this`它不知怎的指向了函数的作用域

对于第一点,`this`在字面意思上可能是是自己,但这是个误解,this 实际上是在函数被调用时建立的一个绑定，它指向 什么 是完全由函数被调用的*调用点*(函数在代码中被调用的位置)来决定的。

第二点在理解时好像`this`指向了模有一个函数的作用域,要知道*this 不会以任何方式指向函数的 词法作用域*,因为这是引擎内部是这样是实现的

```JavaScript
function foo() {
	var a = 2;
	this.bar();
}

function bar() {
	console.log( this.a );
}

foo(); //undefined
```

当我要查找`this.a`的值时候是找不到的,所以*你不能使用 this 引用在词法作用域中查找东西*
还要注意:

- `this` 不是编写时绑定,而是运行时绑定,它依赖于函数调用的上下文条件.
- `this` 绑定与函数声明的位置没有任何关系,而与函数被调用的方式紧密相连.

在我们查找 this 的指向时是由四种规则适用的,按照优先级排列分别是:

- new 绑定: 函数通过`new 关键字`被调用的,`this`指向这个心被创建的对象
- 明确绑定: 函数是通过 `call`,`apply`,`bind`调用,`this`指向那个被明确指明的对象
- 隐含绑定: 函数是通过环境对象被调用的,`this`指向那个环境对象(`let foo = obj.foo`)
- 默认绑定: 函数正常执行,使用默认的`this`,此时`this`指向全局(`window`),但是在严格模式(`strict mode`)下,`this`为 `undefined`

new 绑定:

```JavaScript
function Foo(arg){
	this.a = arg
}

const foo = new Foo(2)

console.log(foo.a) // 2

```

明确绑定:

```JavaScript

function foo(){
	this.a = 1
}

const obj = {
	a:21
}

foo.call(obj,32)

console.log(obj.a)  // 1

```

隐含绑定:

```javascript
function foo() {
  this.a = 2
}

const obj = {
  a: 1,
  foo: foo,
}

obj.foo()

console.log(obj.a) // 2
```

默认绑定:

```javascript
function foo() {
  this.a = 123
}
foo()
console.log(a) // 123
```
