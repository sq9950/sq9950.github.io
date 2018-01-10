import React from 'react'
// import JIMU from '../../src/index'
import JIMU from './index'

const { Button } = JIMU

// 按钮组件 Button
class _Button extends React.Component {
  render() {
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="https://uxdcer.github.io/jimu-mobile/#/?_k=ahtykk"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 124}px`}}>
          <h2 className="page-title"><b>Button</b><span>按钮</span></h2>
          <div className="demo-show demo-button">
            <dl className="dl-list">
              <dt>基础按钮(大)</dt>
              <dd><Button type="highlight">主要按钮</Button></dd>
              <dd><Button type="highlight" disabled={true}>主要按钮 disabled</Button></dd>
              <dd><Button>次要按钮</Button></dd>
              <dd><Button disabled={true}>次要按钮 disabled</Button></dd>
              <dd><Button float>地图浮层按钮</Button></dd>
              <dd><Button disabled={true} float>地图浮层按钮 disabled</Button></dd>

              <dt>图标+文字</dt>
              <dd><Button type="highlight"><span className="icon-pay icon-jimu-pay"></span>主要按钮</Button></dd>
              <dd><Button type="highlight" disabled={true}><span className="icon-pay icon-jimu-pay"></span>主要按钮 disabled</Button></dd>
              <dd><Button><span className="icon-pay icon-jimu-pay"></span>次要按钮</Button></dd>
              <dd><Button disabled={true}><span className="icon-pay icon-jimu-pay"></span>次要按钮 disabled</Button></dd>

              <dt>基础按钮(小)</dt>
              <dd>
                <span className="de-mr-5 de-pb-5 di-inblok"><Button size="small">默认</Button> </span> 
                <span className="de-mr-5 de-pb-5 di-inblok"><Button type="highlight" size="small">高亮</Button> </span> 
                <span className="de-mr-5 de-pb-5 di-inblok"><Button type="highlight" disabled={true} size="small">锁定高亮</Button> </span> 
                <span className="de-mr-5 de-pb-5 di-inblok"><Button disabled={true} size="small">锁定</Button> </span> 
                <span className="de-mr-5 de-pb-5 di-inblok"><Button selected={true} size="small">选中</Button> </span> 
                <span className="de-mr-5 de-pb-5 di-inblok"><Button selected={true} size="small" float>选中</Button> </span> 
                <span className="de-mr-5 de-pb-5 di-inblok"><Button selected={true} disabled={true}  size="small" float>锁定</Button> </span> 
              </dd>

              <dt>尺寸</dt>
              <dd>
                <span className="de-mr-5 de-pb-5 di-inblok"><Button className="jimu-button-size-big" type="highlight">默认</Button> </span> 
                <span className="de-mr-5 de-pb-5 di-inblok" style={{"marginLeft":"10px","verticalAlign" : "bottom"}}><Button className="jimu-button-size-samll" size="small">高亮</Button> </span> 
              </dd>
            </dl>
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>
    )
  }
}

export default _Button
