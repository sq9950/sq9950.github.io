/**
* Created by yanshenshen on 17/10/30.
*/
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class NoticeBar extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    closeIconShow: PropTypes.bool,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    isShadowStyle: PropTypes.bool,
    speed: PropTypes.number,
    duration: PropTypes.number,
    closeBack: PropTypes.func,
  }

  static defaultProps = {
    show: true, // 是否展示
    closeIconShow: false, // 是否显示关闭按钮
    message: '', // 通告栏提示文本
    isShadowStyle: false, // 展示类型 false：通栏展示 ，true：白色背景带阴影的通栏
    iconHtml: '', // icon图标 html 结构
    speed: 3, // 速度
    rollingUp: false, // 是否开启上下翻滚
    closeBack() {}, // 关闭后的回调
    duration: 0.8, // 翻滚动画执行的时间
    scrollDuration: 3000, // 左右滚动停顿时常
    scrollDefaultLeft: 10, // 左右滚动时初始位置
  }

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
    };
    this.hideClick = this.hideClick.bind(this);
  }


  componentDidMount() {
    const { rollingUp, message } = this.props,
      { messageRoot, messageItemsRoot } = this,
      msgWidth = messageRoot.clientWidth,
      itemsWidth = messageItemsRoot.clientWidth;

    if (itemsWidth > msgWidth && !rollingUp) {
      this.latMove();
      return;
    }
    messageItemsRoot.style.left = '0px';
    if (rollingUp && typeof message === 'object') {
      this.rollMove();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) {
      this.setState({
        show: nextProps.iconHide,
      });
    }
    this.timer && clearInterval(this.timer);
    this.rooltimer && clearTimeout(this.rooltimer);
    this.scrolltimer && clearTimeout(this.scrolltimer);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
    this.rooltimer && clearTimeout(this.rooltimer);
    this.scrolltimer && clearTimeout(this.scrolltimer);
  }

  latMove() {
    const self = this,
      { speed, scrollDuration, scrollDefaultLeft } = this.props,
      { messageRoot, messageItemsRoot } = this,
      // msgWidth = messageRoot.clientWidth,
      itemsWidth = messageItemsRoot.clientWidth - messageRoot.clientWidth,
      mySpeed = speed > 10 ? 10 : speed,
      initLeft = scrollDefaultLeft;
    this.itemsLeft = initLeft;
    this.timer = setInterval(() => {
      if (self.itemsLeft < -itemsWidth) {
        self.itemsLeft = initLeft;
        this.timer && clearInterval(this.timer);

        self.scrolltimer = setTimeout(() => {
          self.latMove();
        }, scrollDuration);

        return false;
      }
      self.itemsLeft--;
      self.latMoving(self.itemsLeft);
    }, 100 / mySpeed);
  }

  latMoving(left) {
    const { messageItemsRoot } = this;
    messageItemsRoot.style.left = `${left}px`;
  }

  rollMove() {
    const self = this,
      { speed, message, duration } = this.props,
      { messageItemsRoot } = this,
      mySpeed = speed > 10 ? 10 : speed;
    // 如果子元素个数为一时 ，不滚动
    if (message.length <= 1) {
      return;
    }
    this.itemsCur = 0;
    this.timer = setInterval(() => {
      if (self.itemsCur >= message.length) {
        self.itemsCur = 0;
        messageItemsRoot.style.WebkitTransition = 'none';
        messageItemsRoot.style.top = '0px';
      }
      self.rooltimer && clearTimeout(self.rooltimer);
      self.rooltimer = setTimeout(() => {
        messageItemsRoot.style.WebkitTransition = `all ${duration}s ease-in`;
        self.itemsCur++;
        self.rollMoveing(self.itemsCur);
      }, 20);
    }, 1000 * (10 / mySpeed));
  }

  rollMoveing(idx) {
    const { messageItemsRoot, messageRoot } = this;
    messageItemsRoot.style.top = `-${idx * messageRoot.clientHeight}px`;
  }

  hideClick() {
    this.setState({
      show: false,
    });
    this.timer && clearInterval(this.timer);
    this.rooltimer && clearTimeout(this.rooltimer);
    this.scrolltimer && clearTimeout(this.scrolltimer);
    this.closeBack && this.closeBack();
  }

  messageHTML() {
    const { message } = this.props;
    if (typeof message === 'string') {
      return (<li>{message}</li>);
    }
    if (typeof message === 'object') {
      return message.map((re, idx) => (<li key={idx}>{re}</li>));
    }
  }

  render() {
    const {
        closeIconShow, className, message, iconHtml, rollingUp, isShadowStyle, ...others
      } = this.props,
      { show } = this.state;
    const cls = classNames({
      'jimu-noticebar': true,
      'jimu-noticebar-layout-asideicon': iconHtml,
      'jimu-noticebar-layout-iconhidden': !iconHtml,
      'jimu-noticebar-layout-shadow': isShadowStyle,
      'jimu-noticebar-layout-closehidden': !closeIconShow,
      'jimu-noticebar-rollingup': rollingUp,
      [className]: className,
    });

    return (
      <div className={cls} style={{ display: show ? 'flex' : 'none' }} {...others}>
        {iconHtml && <div className="jimu-noticebar-aside-icon">{iconHtml}</div>}
        <div className="jimu-noticebar-msg" ref={(t) => { this.messageRoot = t; }}>
          <ul className="jimu-noticebar-msg-items" ref={(t) => { this.messageItemsRoot = t; }} style={{ left: '1000px' }}>
            {this.messageHTML()}
            {rollingUp && message.length > 1 && typeof message === 'object' && <li key="-1">{message[0]}</li>}
          </ul>
        </div>
        {closeIconShow && <div className="jimu-noticebar-icon-close" onClick={this.hideClick}><span className="icon-del" /></div>}
      </div>
    );
  }
}
export default NoticeBar;
