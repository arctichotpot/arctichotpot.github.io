---
title: react-router用法
date: 2021-01-11
tags: React
categories:
  - notes
  - 2021
excerpt: 关于react-router-dom的用法,目前版本是5.2
---

1. [react-router 的官方文档](https://reactrouter.com/core/guides/quick-start)
2. [react-router 的 GitHub](https://github.com/ReactTraining/react-router)
3. [react-router 的 npm 包地址](https://www.npmjs.com/package/react-router)
4. [比较靠谱一点的中文翻译](https://segmentfault.com/a/1190000020812860)

# 安装

 安装命令:
```
npm install react-router-dom
```

先简单介绍一下 react-router-dom 与 react-router 的区别:react-router-dom 是基于 react-router 加入了在浏览器运行环境下的一些功能,例如 Link 组件,BrowserRouter 和 HashRouter 组件,在安装 react-router-dom 会自动一起安装 react-router 的.
那么就开始正式的学习吧.


# 使用

## 基本路由

```JavaScript

import React from 'react';
import ReactDOM from 'react-dom'; 
import './index.css';
 // 引入react-router
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"; 

// Router: 所有路由器组件的通用底层接口,我们可以把它看做是react路由的一个路由外层盒子，它里面的内容就是我们单页面应用的路由以及路由组件
// Route: 代表了你的路由界面，path代表路径，component代表路径所对应的界面
// Switch: 渲染与位置匹配的第一个子元素<Route>或<Redirect>,其中的<Route>在路径相同的情况下，只匹配第一个，这个可以避免重复匹配；
// Link: 会被渲染成一个<a></a>,是react路由中的点击切换到哪一个组件的链接

// 定义inbox组件
const Inbox = function () {return <div>Inbox</div>}
// 定义about组件
const About = function () {return <div>about</div>}
// 定义App组件
class App extends React.Component {
    render() {
        return (
            <Router> 
                <div>
                    <h1>App</h1>
                    <ul>
                    {/* Link标签开始导航 */}
                        <li><Link to="/about"> about</Link></li>
                        <li><Link to="/inbox">inbox</Link></li>
                    </ul>
                    {this.props.children}
                </div>
                {/* 在这Switch标签匹配路由*/}
                <Switch>
                    <Route path="/about"><About/></Route>
                    <Route path="/inbox"><Inbox/></Route>
                </Switch>
            </Router>
        )
    }
}
// 基本使用
ReactDOM.render(
    <React.StrictMode>
        <App></App>
    </React.StrictMode>,
    document.getElementById('root')
);

```

最近太忙,给自己立个flag,过年更新完哈哈哈哈

=======     未完待续     =====