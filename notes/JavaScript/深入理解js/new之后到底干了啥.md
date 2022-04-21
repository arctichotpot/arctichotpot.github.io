**根据 MDN 的解释:<br />**

> **`new` 运算符**创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。
>
> <a name="J29mT"></a>

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

<a name="eOYf7"></a>

## 详细解释下

```javascript
function Person(name) {
  this.name = name
}
```

<a name="Wg8iO"></a>

### 1. 创建一个空的对象

```javascript
const tom = new Person()
// Person {name: undefined }
```

<a name="ARhNg"></a>

### 2. 链接该对象(设置该对象的 constructor)到另一个对象(创建的对象)

<br />
> 每个原型都有一个 constructor 属性指向关联的构造函数。
> 每一个JavaScript对象(除了 null )都具有的一个属性，叫__proto__，这个属性会指向该对象的原型。

```javascript
tom._propto_ = Perosn.constructor

// 这个例子里,Person是一个构造函数,tom是一个实例对象
```

这样可能更直观一点
![](https://cdn.nlark.com/yuque/0/2021/jpeg/514813/1614242544139-2211f2f0-67dd-4429-8228-05713086f01b.jpeg)`Person(构造函数)`的`constructor`指向 `Person.prototype(实例原型)`<br />`Person(构造函数)`的`prototype`指向 `Person.prototype(实例原型)`<br />执行 `new Person`时候并执行 `tom._propto_ = Perosn.constructor`,也就说`tom._propto_`<br />就指向了 `Person.prototype(实例原型)`<br />有点绕哈哈哈哈,详细可以去看看这篇文章 [JavaScript 深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)<br />

<a name="MG5iA"></a>

### 3. 将第一步新创建的对象作为 this 的上下文

`Person.call(tom)`<br />
<br />
<br />
<br />
