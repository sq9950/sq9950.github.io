/**
 * Created by zhaojie on 16/06/12.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Mask from '../mask/index';

export default class Toast extends React.Component {
  static propTypes = {
    buttons: PropTypes.array,
    toastShow: PropTypes.bool,
    title: PropTypes.string,
    callback: PropTypes.func,
  }

  static defaultProps = {
    buttons: [],
    show: false,
    title: '',
    time: 3000,
  }

  constructor(props) {
    super(props);
    this.state = this.props;
    this.changeToast = this.changeToast.bind(this);
  }

  componentDidMount() {
    this.changeToast();
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops) {
      if (this.toastContent) {
        this.toastContent.style.width = 'auto';
      }
      this.setState({
        toastShow: nextprops.toastShow,
        time: nextprops.time,
      });
    }
  }

  shouldComponentUpdate(nextprops, nextstate) {
    // 如果toast已经消失 则不再render
    if (nextstate.toastShow === false && this.state.toastShow === false) return false;
    return true;
  }

  componentDidUpdate() {
    this.changeToast();
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  setToastHide() {
    this.setState({
      toastShow: false,
    });
  }

  changeToast() {
    const { time, toastShow } = this.state;
    if (toastShow) {
      const that = this,
        { toast, toastContent } = this;
      let toastHeight = toast.offsetHeight,
        toastContentWidth = toastContent.offsetWidth,
        toastContentHeight = toastContent.offsetHeight;

      /* 多行展示判断，用到 -webkit-transform: translate(-50%, -50%)属性，css无法设置max-width控制页面宽度自适应。所以用以下js控制 */
      if (toastContentWidth >= 180 || toastContentHeight > 25) {
        toastContent.style.width = '180px';
        toastContent.style.whiteSpace = 'normal';
      } else {
        toastContent.style.width = 'auto';
        toastContent.style.whiteSpace = 'nowrap';
      }

      this.timer = setTimeout(() => {
        that.setToastHide();
        if (that.props.link) { // 用户填写的link，则将当前的页面记录到浏览器的历史记录中
          browserHistory.push(that.props.link);
        }

        if (that.props.virtual) { // 如果用户选择的是virtual,则将当前页面地址从浏览器历史记录中替换掉
          browserHistory.replace(that.props.virtual);
        }

        if (that.props.callback) {
          that.props.callback();
        }
      }, time);
    }
  }

  _icon() {
    const { type } = this.props;
    if (type === 'fail') {
      return (
        <p className="icon-toast_warning toast_icon">
          <span className="path1" /><span className="path2" />
        </p>
      );
    } else if (type === 'success') {
      return (
        <p className="icon-toast_right toast_icon">
          <span className="path1" /><span className="path2" /><span className="path3" />
        </p>
      );
    } else if (type === 'loading') {
      return (
        <div className="jimu-load-loading">
          <div className="load-spinner">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      );
    }
    return (
      <p className="icon-toast_wrong toast_icon">
        <span className="path1" /><span className="path2" /><span className="path3" />
      </p>
    );
  }

  render() {
    const { content } = this.props;
    const { toastShow } = this.state;

    return (
      <div className="jimu-dialog jimu-dialog-toast" style={{ visibility: toastShow ? 'visible' : 'hidden' }}>
        <Mask />
        <div className="didi_toast" ref={(t) => { this.toast = t; }}>
          {this._icon()}
          <div className="didi_toast_content" ref={(t) => { this.toastContent = t; }}>
            {content}
          </div>
        </div>
      </div>
    );
  }
}
