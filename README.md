# React Redux Talk

## 开场白

这次 Talk 包括以下内容：

- 简单介绍下自己对【单向数据流】应用的模块划分
- 结合例子讨论，顺便演示 Redux 的开发体验：
  - 一个简单的例子：如何科学的编写 React 组件与 Redux 模块
  - 一个相对复杂的例子：现实开发中面对的问题
  - 一种特殊的组件：High Order Component
- 自己的一些想法

开始之前，假设大家已经：

- 对 React 有一点了解，大概知道 React 组件生命周期，state 和 props 的区别
- 简单了解 Flux 的概念
- 有一些【函数式编程】的概念更佳

> 这不是在安利 React + Redux 🙏，整体架构上还有一些需要思考的地方

## 为什么会有这次 Talk

简单说下起因：

- 团队最近一次项目的技术栈是：React + Redux
- 中台 DPL 组件是基于 React 的

所以分享些经验 🤓。

## 准备工作

这个项目里的所有 Demo 使用的技术：

- React `v15.0.1`
- Redux `v3.4.0`
- react-router `v2.0.1`

顺便感谢以下工具让这个项目能跑起来：

- webpack
- babel

## 正式开始

基于 React + Redux 的单向数据流应用的整体结构【切 Sketch】

【DEMO 0 开始演示，引出下文，简单介绍 duck-modular 和 FSA】

- 如果 state 是有改变的，那么 reducer 必须返回一个新的对象来保证 state 的【不可变性】

#### React：区分组件的类型

- Container：承载大部分页面逻辑（state），完全掌控组件树的 render，并负责数据接入
- Component：被动呈现，乖乖按照别人给的 props 来 render【介绍 functional component】
- High Order Component：React 组件的 ES2015 式写法不再支持 Mixins 后，社区总结的解决方案

【继续展示 DEMO 0（react-redux做了什么， connect 方法），通过 react-devtools 来展示】

#### Redux：以开发体验为出发点

【DOME 1 开始演示，异步请求的问题，开始介绍 Redux 中间件，并解释 Redux 中的函数式编程思想】

所谓的 Store Enhancer 指的是满足签名 `createStore => createStore'` 的函数，
`applyMiddleware()` 就是一个 Store Enhancer

```js
// 优化点：
// - cache 以及 expire
// - 过时请求的dispose
//
// 定制一个中间件来处理
```

如果要让应用是可预测的，那么数据就需要统一在一起，于是只有一个 Store。Store 里包含的数据有：

- 领域模型
- 页面状态（模态窗是否打开，标签页的激活状态）

可预测 => 易测试、易维护

## 自己的一些想法

在已经有一个 SPA 的经验后，发现 **Redux 没有包含一个称职的 Model 层**。

应用状态（这里指 Client Cache）的数据结构是【图】。于是：

- GET 时需要额外的一层来处理关系型数据（页面有时不需要这么多数据）

```js
// 缓存中已经有了如下数据
// 其中一个 company 下有若干个 project（关系型数据）
{
  projects: [
    { projectId, name, startAt }
  ]，
  companies: [
    { companyId, name, projects: [] }
  ]
}

// 跳转到某个 页面A 后仅需要部分数据
// 比如查看一个 company 下所有 projects 的名字
// 【方案】手动去 projects 里做一次 filter
//
// 如果入口是这个 页面A 呢？缓存中已经有了部分 projects 数据
// 那么当查看 project 详情的时候会有重复数据
//
// 好吧，可能觉得这边其实问题不大
```

- SET 时需要针对业务逻辑更新关系型数据（Stale Data）

```js
// 更新数据时，比如删除一个 project，
// 那么你 DELETE 请求发完后，不但要在 cache 中删
// 除 project，还要额外维护 company
```

数据可以来自：

- Client Cache（LocalStorage 或者是请求后的缓存）
- HTTPDataSource（缓存不存在或过期）

我们希望：

- 在调用 Model 层暴露的接口时，可以不用关心数据源
- 不需要手动维护关系型数据（Client Cache）
- 合并请求（RESTful Service 的设计问题）
- 请求是可以被取消的（Promise 的问题，Disposable，页面切换或快速切换分页）

所以：
- 跟进 **Falcor** 和 **Relay**，理解它们可以带来的好处
- 可以学习蚂蚁金服 🐜 的 **Roof**

除此之外，Redux 对我们来说：

- **学习成本巨大**，直接导致促成这次 Talk
- 代码量大

**对于 React 而言，缺少数据依赖的官方解决方案**（Relay？代价？），比如：

```js
// vue 组件有一个 data 方法来解决组件的数据依赖问题，支持异步
// 同时提供变量来解决视图缺少数据时的过度问题
// {
//   data () {
//   }
// }
//
// <spinner v-if={$loading}>
// React 没有，增加了代码量
```

Redux 带来的思考：应用框架（Framework）或是组件库（Library）的开发体验？

- React + Redux 开发成本高，对个人开发不友善，优势不明显，需要有一定沉淀后才能提升开发效率
- 目前 Redux 的开发体检以及 React 结合 webpack 的 hmr 是在增加学习成本并间接拖慢开发效率
- React + Redux 从易测试的角度出发，然而如果是个人开发或是小型应用，那么我们可能 **几乎不写测试**

## 愿景

- 对构建大型 WebApp 上可以有更深入的理解，相较于 Server 端 MVC
  - M 和 V 职责明确
  - C 的部分有些模糊了
  - Router 组件
- 试图解决 Redux 在 Model 层上的缺陷（通过中间件，结合 HOC？）
- 尝试解决团队中企业级应用的的工程化问题

如果有时间，演示【图片加载的坑展示，动画 DEMO】

## 最后

讲到这里 🤓，如果对这块依然有兴趣，你可以：

- **务必认真阅读 [这篇文档](http://facebook.github.io/react/docs/reconciliation.html)**
- 浏览 [React 的官方文档](http://facebook.github.io/react)
- 在 Medium 上搜索关于 React 或 Redux 的文章
- Github 上的 awesome 系列 [React](https://github.com/enaqx/awesome-react) [Redux](https://github.com/xgrommx/awesome-redux)

我用的中间件：

- [redux-combine-actions](https://github.com/itsmepetrov/redux-combine-actions)
- [redux-promise](https://github.com/acdlite/redux-promise)
- [redux-actions](https://github.com/acdlite/redux-actions)

这里有一些资料：

- ~~[React 中文文档（已脱更，v0.13.0）](http://reactjs.cn/react/index.html)~~
- [Redux 中文文档](http://cn.redux.js.org/)
- [High Order Component 缘何而起](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)
