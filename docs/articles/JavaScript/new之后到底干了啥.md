**根据 MDN 的解释:<br />**

> **`new` 运算符**创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。


# 基本用法

```javascript
function Test(name) {
  this.name = name
}
const a = new Test('asd')
console.log(a.name)
```

这几个步骤执行的时候,new 关键字的操作

- 先创建一个空的对象
- 链接该对象(设置该对象的**constructor**)到另一个对象(创建的对象)
- 将第一步新创建的对象作为 this 的上下文


## 详细解释下

```javascript
function Person(name) {
  this.name = name
}
```


### 1. 创建一个空的对象

```javascript
const tom = new Person()
// Person {name: undefined }
```


### 2. 链接该对象(设置该对象的 constructor)到另一个对象(创建的对象)

> 每个原型都有一个 constructor 属性指向关联的构造函数。
> 每一个javascript对象(除了 null )都具有的一个属性，叫__proto__，这个属性会指向该对象的原型。

```javascript
tom._propto_ = Perosn.constructor

// 这个例子里,Person是一个构造函数,tom是一个实例对象
```

这样可能更直观一点
![image](/js/why-new.jpeg)
`Person(构造函数)`的`constructor`指向 `Person.prototype(实例原型)`
`Person(构造函数)`的`prototype`指向 `Person.prototype(实例原型)`
执行 `new Person`时候并执行 `tom._propto_ = Perosn.constructor`,也就说`tom._propto_`就指向了 `Person.prototype(实例原型)`
有点绕哈哈哈哈,详细可以去看看这篇文章 [javascript 深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)


### 3. 将第一步新创建的对象作为 this 的上下文

<!-- `Person.call(tom)` -->
