import React, { Component } from 'react'
import JIMU from './index'
const {Layouts,Form} = JIMU,
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
  } = Layouts,
  {Checkbox} = Form
const _List = React.createClass({
  getInitialState() {
    return {
      disabled : true
    }
  },
  chengeState(){
    this.setState({
      disabled : false
    })
  },
  render() {
    let {isOpen,disabled} = this.state
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="https://uxdcer.github.io/jimu-mobile/#/?_k=ahtykk"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 124}px`}}>
          <h2 className="page-title" onClick={this.chengeState}><b>Checkbox</b><span>复选框</span></h2>
          <div className="demo-show-nopadd">
            <dl className="dl-list">
              <dt>默认样式</dt>
              <dd>
                <Layout>
                  <Items>
                    <Item className="jimu-item-oh jimu-aside-left">
                      <div className="dis-inline"><Checkbox defaultChecked = {false} back={(o)=>{console.log(o)}} label="未选中"/></div>
                      <div className="dis-inline ml-44"><Checkbox defaultChecked = {true} back={(o)=>{console.log(o)}} label="选中"/></div>
                      <div className="dis-inline ml-44"><Checkbox defaultChecked = {true} disabled back={(o)=>{console.log(o)}} label="选中不可点击"/></div>
                    </Item>
                  </Items>
                </Layout>
              </dd>
            </dl>

            <dl className="dl-list mt-20">
              <dt>默认样式</dt>
              <dd>
                <Layout>
                  <Items>
                    <Item className="jimu-item-oh jimu-aside-left jimu-check-item">
                      <Checkbox className="jimu-checkbox-aside" defaultChecked = {false} back={(o)=>{console.log(o)}} label="未选中"/>
                    </Item>
                    <Item className="jimu-item-oh jimu-aside-left jimu-check-item">
                      <Checkbox className="jimu-checkbox-aside" defaultChecked = {true} back={(o)=>{console.log(o)}} label="默认选中"/>
                    </Item>
                    <Item className="jimu-item-oh jimu-aside-left jimu-check-item">
                      <Checkbox className="jimu-checkbox-aside" defaultChecked = {true} disabled back={(o)=>{console.log(o)}} label="选中不可点击"/>
                    </Item>
                    <Item className="jimu-item-oh jimu-aside-left jimu-check-item">
                      <Checkbox className="jimu-checkbox-aside" defaultChecked = {false} disabled back={(o)=>{console.log(o)}} label="未选中不可点击"/>
                    </Item>
                  </Items>
                </Layout>
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
})
module.exports = _List