import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import JIMU from './index';

const { InfiniteLoader, PermissionsCard, Tabs } = JIMU,
  { TabPane } = Tabs;

const _Ringloading = React.createClass({
  getInitialState() {
    return {
      list: [],
      totle: 20,
      stage: 5,
      disSwipe: false,
      direction: 'top',
      swipeSucc: false,
      isSwipeIng: false,
      checkStateChange: 1,
    };
  },

  componentDidMount() { // 计算初始化的高度
    const { direction } = this.state;
    // ,
    //   h = document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight,
    //   listNode = ReactDOM.findDOMNode(this.refs.swipeList)
    // listNode.style.height = `${h - listNode.offsetTop}px`

    this.setState({
      list: this.initInitList(direction),
    });
  },

  initInitList(direction) {
    let start = 1,
      end = 6,
      newA = [];
    for (let i = start; i < end; i++) {
      if (direction === 'top') {
        newA.unshift(i);
      } else {
        newA.push(i);
      }
    }
    return newA;
  },

  onSwipingBack() {},

  onSwipedBack() {
    let self = this,
      {
        list, totle, stage, direction,
      } = this.state,
      listLen = list.length;
    setTimeout(() => {
      if (!(totle == 0 || (totle > 0 && totle == listLen))) {
        let i = listLen + 1,
          l = i + stage,
          newList = list;

        // 重赋值
        for (; i < l; i++) {
          if (direction === 'top') {
            newList.unshift(i);
          } else {
            newList.push(i);
          }
        }

        // 重置 list
        self.setState({
          list: newList,
        });
      }

      self.setState({
        disSwipe: totle <= listLen + stage,
        swipeSucc: true,
      });
    }, 1000);
  },

  changeDir(o) {
    const { direction } = this.state;
    if (o === direction) {
      return false;
    }

    this.setState({
      direction: o,
      disSwipe: false,
      list: this.initInitList(o),
      swipeSucc: false,
    });
    return true
  },

  changeState() {
    this.setState({
      checkStateChange: 3,
    });
  },

  render() {
    const {
      list, disSwipe, direction, swipeSucc,
    } = this.state;
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="https://uxdcer.github.io/jimu-mobile/#/?_k=ahtykk"><span className="icon-pic-home" /></a></div>
        <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 124}px` }}>
          <h2 className="page-title"><b>InfiniteLoader</b><span>滚动加载</span></h2>
          <div className="swipe-tab-layout">
            <Tabs
              activeIndex={1}
              onChange={
              (n) => { this.changeDir(n.activeIndex === 1 ? 'top' : 'bottom'); }
            }
              isInLocal
            >
              <TabPane tab="上拉滚动" />
              <TabPane tab="下拉滚动" />
            </Tabs>
          </div>
          <div style={{ margin: '10px 0px 0px 0px', padding: '0 10px' }}>
            <InfiniteLoader direction={direction} swipeSucc={swipeSucc} onSwipingBack={this.onSwipingBack} onSwipedBack={this.onSwipedBack} disSwipe={disSwipe} height={`${document.body.clientHeight - 148}px`}>
              {list.map((res, index) => (
                <div key={index}>
                  <PermissionsCard
                    iconHTML={<span className="icon-jimu-right" />}
                    titleHTML={`微信支付合作商谈 - ${res}`}
                    messageHTML="1月12日-1月20日"
                    labelTitle="过期未审批"
                    labelType="fail"
                    href="javascript:;"
                  />
                </div>
                ))}
            </InfiniteLoader>
          </div>
        </div>
      </div>
    );
  },
});
module.exports = _Ringloading;
