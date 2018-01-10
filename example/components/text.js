import React, { Component } from 'react'
import JIMU from './index'
import { Link } from 'react-router'

const {Rule,Button} = JIMU,
  {RuleLine} = Rule

const _Rule = React.createClass({
  getInitialState() {
    return {
      list1 : [{name:"50cm",value:50},{name:"60cm",value:60},{name:"70cm",value:70},{name:"80cm",value:80},{name:"90cm",value:90},{name:"100cm",value:100},{name:"110cm",value:110},{name:"120cm",value:120},{name:"130cm",value:130},{name:"140cm",value:140},{name:"150cm",value:150},{name:"160cm",value:160},{name:"170cm",value:170},{name:"180cm",value:180},{name:"190cm",value:190},{name:"200cm",value:200},{name:"210cm",value:210},{name:"220cm",value:220},{name:"230cm",value:230},{name:"240cm",value:240},{name:"250cm",value:250}],
      defaultValue1 : 170,
      touchMin1 : 60, // 可拖动最小值
      touchMax1 : 240, // 可拖动最大值
      min1 : 40, // 最小值
      max1 : 300, // 最大值

      list2 : [{name:"20kg",value:20},{name:"40kg",value:40},{name:"60kg",value:60},{name:"80kg",value:80},{name:"100kg",value:100},{name:"120kg",value:120},{name:"140kg",value:140},{name:"160kg",value:160},{name:"180kg",value:180},{name:"200kg",value:200},{name:"220kg",value:220},{name:"240kg",value:240},{name:"260kg",value:260}],
      defaultValue2 : 75,
      touchMin2 : 40, // 可拖动最小值
      touchMax2 : 240, // 可拖动最大值
      min2 : 20, // 最小值
      max2 : 300, // 最大值

      pageName : ""
    }
  },

  slidecb(o){
    this.setState({
      defaultValue1 : o.value
    })
  },

  changeList(){
    this.setState({
      list1 : [{name:"60cm",value:60},{name:"70cm",value:70},{name:"80cm",value:80},{name:"90cm",value:90},{name:"100cm",value:100},{name:"110cm",value:110},{name:"120cm",value:120},{name:"130cm",value:130},{name:"140cm",value:140},{name:"150cm",value:150},{name:"160cm",value:160},{name:"170cm",value:170},{name:"180cm",value:180},{name:"190cm",value:190},{name:"200cm",value:200},{name:"210cm",value:210}],
      defaultValue1 : 150,
      touchMin1 : 80, // 可拖动最小值
      touchMax1 : 190, // 可拖动最大值
      min1 : 20, // 最小值
      max1 : 330 // 最大值
    })
  },


  slide2cb(o){
    this.setState({
      defaultValue2 : o.value
    })
  },

  pageTo(name){
    if (name == "") {
      this.refs["page" + this.state.pageName].style.left = "100%"
      history.pushState({}, "" , "http://0.0.0.0:3004/#/text")
    }else{
      this.refs["page"+name].style.left = 0
      history.pushState({}, "" , "http://0.0.0.0:3004/#/" + name)
    }

    this.setState({
      pageName : name
    })
  },

  // <RuleLine list={list2} back={this.slide2cb} defaultValue={defaultValue2} touchMin={touchMin2} touchMax={touchMax2} min={min2} max={max2}/>

  render() {
    let {value,list1,defaultValue1,touchMin1,touchMax1,min1,max1,list2,defaultValue2,touchMin2,touchMax2,min2,max2} = this.state
    return(
      <div>
        <div className="examp-page">
          <div className="page-title">
            <h1>jiMu</h1>
            <h2>积木组件库助力移动端开发</h2>
          </div>
          <ul className="libs">
            <li onClick={this.pageTo.bind(this,"rule")}>
                <span className="icon-equalizer"></span>
                <b>刻度尺</b>
            </li>
            <li onClick={this.pageTo.bind(this,"button")}>
                <span className="icon-stop"></span>
                <b>按钮</b>
            </li>
          </ul>
        </div>

        <div className="libs-intr trans-page" ref="pagerule">
          <div className="examp-back"><a href="javascript:;"  onClick={this.pageTo.bind(this,"")}><span className="icon-undo2"></span>返回首页</a></div>
          <h2 onClick={this.changeList}><span className="icon-equalizer"></span> 刻度尺 (Rule)</h2>
          <div className="demo-show">
            <h3 className="demo-title">demo展示</h3>
            <div className="">
              <div className="list intrs-title">Rule:</div>
              <div className="text-cent">您的身高为 : {defaultValue1}cm</div>
              <div className="list" ref="rulePage">
                <RuleLine unitWidth={10} list={list1} back={this.slidecb} defaultValue={defaultValue1} touchMin={touchMin1} touchMax={touchMax1} min={min1} max={max1}/>
              </div>

              <br />
              <div className="text-cent">您的体重为 : {defaultValue2}kg</div>
              <div className="list">
                <RuleLine list={list2} back={this.slide2cb} defaultValue={defaultValue2} touchMin={touchMin2} touchMax={touchMax2} min={min2} max={max2}/>
              </div>

            </div>
          </div>
        </div>

        <div className="libs-intr trans-page" ref="pagebutton">
          <div className="examp-back"><a  href="javascript:;"  onClick={this.pageTo.bind(this,"")}><span className="icon-undo2"></span>返回首页</a></div>
          <h2><span className="icon-stop"></span> 按钮(Button)</h2>
          <div className="demo-show">
            <dl>
              <dd>
                <Button type="highlight" size="small">Mini</Button>
                <Button type="highlight" disabled={true} size="small">Mini</Button>
                <Button disabled={true} size="small">Mini</Button>
              </dd>

              <dd><Button>默认</Button></dd>
              <dd><Button type="highlight">高亮</Button></dd>
              <dd><Button type="highlight" disabled={true}>锁定高亮</Button></dd>
              <dd><Button disabled={true}>锁定</Button></dd>
              <dd><Button selected={true}>选中</Button></dd>
              <dd><Button selected={true}>选中状态</Button></dd>
            </dl>
          </div>
        </div>

      </div>
    )
  }
})
module.exports = _Rule 