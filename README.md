#jimu-mobile

[JIMU](https://www.npmjs.com/package/jimu-mobile) Components build with [React](http://facebook.github.io/react/).

## Installation

版本 (1.13.1)

With [npm](http://npmjs.com/):

If React is not installed

```
npm install --save react react-dom
```

With React Installed

```
npm install jimu-mobile --save

```
[![jimu-mobile](https://nodei.co/npm/jimu-mobile.png)](https://www.npmjs.com/package/jimu-mobile)


import css

```
import 'jimu-mobile/dist/styles/jimu.min.css'
```

import JIMU

```
// 引用方式一
import JIMU from 'jimu-mobile'
const {Button} = JIMU

// 引用方式二
import {Button} from 'jimu-mobile'

// 单个组件引用方式 （推荐使用，节省无用组件调用）
import Button from 'jimu-mobile/dist/components/button'
```

## Example

We have several examples on the documentation. Here is the first one to get you started:
```javascript

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//import jimu-mobile
import JIMU from 'jimu-mobile'
import 'jimu-mobile/dist/styles/jimu.min.css'
const {Button} = JIMU

class App extends Component {
    render() {
        return (
            <Button>hello JIMU</Button>
        );
    }
}

ReactDOM.render((
    <App/>
), document.getElementById('container'));

```

## 源码git地址

```
https://github.com/UXDCer/jimu-mobile.git
```

## Mobile Demo

![jimu](https://uxdcer.github.io/jimu-mobile/qrcode.png)

[jimu](https://uxdcer.github.io/jimu-mobile/)

## 反馈方式

```
jimu组件QQ群 ：583011925
```
[github-issue](https://github.com/UXDCer/jimu-mobile/issues)

## api 接口文档

[jimu-api](http://uxdc.intra.xiaojukeji.com/)

## 源码地址

[jimu-github](https://github.com/UXDCer/jimu-mobile)
