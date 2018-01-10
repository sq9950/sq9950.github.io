import React, { Component } from 'react'
import JIMU from './index'
const {Layouts,Inputs} = JIMU,
  {
    Layout,
    LayoutHd,
    LayoutHdTitle,
    LayoutHdAside,
    LayoutBd,
    LayoutFt,
    Items,
    Item,
    ItemAside,
    ItemContent,
    ItemTitle,
    ItemDesc,
    ItemHd,
    ItemBd,
    ItemFt,
    ItemLink
  } = Layouts

// 表单组合 Inputs
const _Inputs = () => (
    <div className="example-wrap">
      <div className="example-back"><a href="https://uxdcer.github.io/jimu-mobile/#/?_k=ahtykk"><span className="icon-pic-home"></span></a></div>
      <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 124}px`}}>
        <h2 className="page-title"><b>Inputs</b><span>表单组合</span></h2>
        <div className="demo-show">
          <dl className="dl-list">
            <dt>表单组合</dt>
          </dl>
        </div>
        <div className="component-bg-white de-padd-40-20" style={{"marginTop":"10px","background":"#fff"}}>
          <dl className="dl-list">
            <dd><Inputs placeholder="提示文字"/></dd>
            <dd><Inputs inputsAlign="left" placeholder="提示文字" asideType="checkbox"/></dd>
            <dd><Inputs inputsAlign="right" placeholder="提示文字" asideType="checkbox"/></dd>
            <dd><Inputs inputsAlign="left" placeholder="提示文字"  asideType="radio" asideName="test_radio"/></dd>
            <dd><Inputs inputsAlign="right" placeholder="提示文字" asideType="radio" asideName="test_radio"/></dd>
          </dl>
        </div>
      </div>
      <div className="footer-name">
        <span className="footer-name-pic"></span>
      </div>
    </div>
)
module.exports = _Inputs
