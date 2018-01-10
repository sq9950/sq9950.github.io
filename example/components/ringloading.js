import React, { Component } from 'react'
import JIMU from './index'
const {Ringloading} = JIMU
// import Ringloading from 'jimu-mobile/dist/components/ringloading'
const _Ringloading = () => (
  <div className="example-wrap">
    <div className="example-back"><a href="https://uxdcer.github.io/jimu-mobile/#/?_k=ahtykk"><span className="icon-pic-home"></span></a></div>
    <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 124}px`}}>
      <h2 className="page-title"><b>Ringloading</b><span>环形加载</span></h2>
      <div className="ring-demo-show">
        <dl className="dl-list">
          <dt>默认</dt>
          <dd><Ringloading /></dd>

          <dt>前端带指针</dt>
          <dd><Ringloading ballShow={true} ballBgColor="#ff5722" width={176} ringTimer={30000} contentBgColor="#f0f0f0" borderColor="#ff8741" bottomRingBgColor= "#d8dada"/></dd>

          <dt>样式自定义</dt>
          <dd><Ringloading width={140} text="loading…" border={2} borderColor="#1E96FA" contentBgColor="#fff" contentColor="#1E96FA" textSize="12px"/></dd>
        </dl>
      </div>
    </div>
    <div className="footer-name">
      <span className="footer-name-pic"></span>
    </div>
  </div>
)
module.exports = _Ringloading
