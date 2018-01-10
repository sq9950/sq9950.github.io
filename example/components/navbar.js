import React from 'react';
import JIMU from './index';

const { NavBar } = JIMU,
  { NavItem } = NavBar;
// 按钮组件 Label
class _NavBar extends React.Component {
  render() {
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="https://uxdcer.github.io/jimu-mobile/#/?_k=ahtykk"><span className="icon-pic-home" /></a></div>
        <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 124}px` }}>
          <h2 className="page-title"><b>NavBar</b><span>导航栏</span></h2>
          <div className="demo-content">
            <h2 className="demo-title">导航栏-多个标签</h2>
            <div className="demo-component-nppadd component-bg-white">
              <NavBar activeIndex={2}>
                <NavItem onClick={function () { console.log('点击了快车,可以自定义事件，也可以添加href跳转页面'); }} >快车</NavItem>
                <NavItem onClick={function () { console.log('点击了专车,可以自定义事件，也可以添加href跳转页面'); }} >专车</NavItem>
              </NavBar>
            </div>
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic" />
        </div>
      </div>
    );
  }
}
export default _NavBar;
