// const a = {
//     x: 10,
//     add: function (y) {
//         return this.x + y
//     }
// }

// const b = {
//     x: 100,
//     __proto__: a
// }

// const c = {
//     x: 1000,
//     __proto__: a
// }

// console.log(b.add(1)) // 101
// console.log(c.add(1)) // 1001



// function Func () {
//     this.x = 10
//     this.add = function (y) {
//         return this.x + y
//     }
// }

// const a = new Func()
// const b = new Func()



    function Person (name) {
        this.name = name
        this.age = 10
        this.print = function () { console.log(`name:${this.name},age:${this.age}`) }
    }

    const tom = factory(Person, 'tom')

    tom.print()


// 第二版的代码


function factory () {

    // 创建一个空对象
    var obj = new Object()

    // 获取构造函数
    const Constructor = [].shift.call(arguments)

    // 将这个空对象的__proto__指向构造函数的原型
    Object.setPrototypeOf(obj, Constructor.prototype);

    // 将 this 指向空对象
    var res = Constructor.apply(obj, arguments)

    return res instanceof Object ? res : obj;

};

