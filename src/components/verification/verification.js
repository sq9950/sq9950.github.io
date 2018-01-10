/**
 * yanshenshen 06/20/2017
 */
import React from 'react';
import classNames from 'classnames';
import Dialog from '../dialog';

const { ContentTip } = Dialog;
class Code extends React.Component {
  static propTypes = {}
  static defaultProps = {
    show: false, // 是否展示
    phone: '13222229999', // 电话号码
    timer: 30, // 倒计时
    inputBack() {}, // 输入完成后的回调
    inputBegin() {}, // 输入开始的回调
    closeBack() {}, // 关闭后的回调
    resetBack() {}, // 点击重新发送后的回调
    timeEndBack() {}, // 点击重新发送后的回调
    inputType: 'tel', // 小键盘类型
    len: 4, // 验证码数
    timeStart: false, // 倒计时开始计时
  }

  constructor(props) {
    super(props);

    const {
        show, timer, phone, len,
      } = props,
      inputsArr = Array(len).fill(0);

    this.state = {
      show,
      timer,
      phone,
      len,
      inputsArr,
      codeValue: '',
      once: true,
    };

    this.closeClick = this.closeClick.bind(this);
    this.reSetClick = this.reSetClick.bind(this);
    this.focusClick = this.focusClick.bind(this);
    this.focusHandle = this.focusHandle.bind(this);
    this.blurHandle = this.blurHandle.bind(this);
    this.changeHandle = this.changeHandle.bind(this);
  }

  componentDidMount() {
    const { timeStart, timer } = this.props;
    if (timeStart) {
      this.timeDown(timer);
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.show) {
      this.setState({
        show: nextprops.show,
        once: true,
      });
    }

    if (nextprops.len !== this.props.len) {
      this.mytimer && clearTimeout(this.mytimer);
      const { len } = nextprops;
      const inputsArr = [];
      for (let i = 0; i < len; i++) {
        inputsArr.push(i);
      }
      this.setState({
        len,
        inputsArr,
      });

      this.timeDown(nextprops.timer);
    }

    if (nextprops.phone !== this.props.phone) {
      this.mytimer && clearTimeout(this.mytimer);
      this.setState({
        phone: nextprops.phone,
        timer: nextprops.timer,
        codeValue: '',
        codeFocus: false,
      });

      this.timeDown(nextprops.timer);
    }
  }
  componentWillUnmount() {
    this.mytimer && clearTimeout(this.mytimer);
  }
  timeDown(timer) {
    const self = this,
      { timeEndBack } = this.props;
    this.mytimer = setTimeout(function () {
      if (timer > 0) {
        timer--;
        self.setState({ timer });
        self.timeDown(timer);
      } else {
        clearTimeout(this.mytimer);
        if (timeEndBack) {
          timeEndBack();
        }
      }
    }, 1000);
  }

  reSetClick() {
    const self = this,
      { resetBack, timer } = this.props;
    this.setState({
      timer,
    });

    setTimeout(() => {
      self.timeDown(timer);
    });

    if (resetBack) {
      resetBack();
    }
  }

  closeClick() {
    const { closeBack } = this.props;
    this.setState({
      show: false,
      codeValue: '',
      codeFocus: false,
    });
    if (closeBack) {
      closeBack();
    }
  }

  changeHandle() {
    const { len, focus, once } = this.state,
      { inputBack, inputBegin } = this.props,
      { codeInput } = this;

    this.setState({
      codeValue: codeInput.value,
    });

    once === true && codeInput.value.length === 1 && inputBegin && inputBegin(codeInput.value);

    if (codeInput.value > 1) {
      this.setState({
        once: false,
      });
    }

    if (codeInput.value.length >= len && focus) {
      if (inputBack) {
        inputBack(codeInput.value);
      }
    }
  }

  focusClick() {
    this.setState({
      codeFocus: true,
    });
  }

  blurHandle() {
    this.setState({
      focus: false,
    });
  }

  focusHandle() {
    this.setState({
      focus: true,
    });
  }

  render() {
    const self = this,
      {
        show, timer, phone, codeValue, inputsArr, len, codeFocus,
      } = this.state,
      { inputType, className } = this.props,
      formatPhone = `${phone.substring(0, 3)} ${phone.substring(3, 7)} ${phone.substring(7, 11)}`,
      cls = classNames({
        'jimu-code': true,
        'jimu-code-more': len > 4,
        'jimu-code-focus': codeFocus,
        [className]: className,
      });
    return (
      <ContentTip show={show} className="jimu-code-tip" MaskClick={this.closeClick}>
        <div className={cls}>
          <div className="jimu-code-hd">
            <span className="code-icon-del icon-del" onClick={this.closeClick} />
            <h2 className="hd-title">请输入手机验证码</h2>
            <div className="code-intr">
              验证码发送至
              {formatPhone}
            </div>
          </div>
          <div className="jimu-code-bd">
            <div className="time-down">
              {timer !== 0 ? (<span className="code-number">{timer} 秒后可重发</span>) : <span className="reset-code" onClick={this.reSetClick}>重新发送</span>}
            </div>
            <div className="jimu-code-inputs" onClick={this.focusClick}>
              <label>
                <div className="code-values">
                  {inputsArr.map((re, index) => {
                     if (codeValue.length >= index) {
                      if (index === codeValue.length) {
                         return (<div key={index} className="layout-code code-focus">
                           <span>{codeValue[index]}</span>
                                 </div>);
                       }
                       return (<div key={index} className="layout-code code-focus no-focus-line">
                         <span>{codeValue[index]}</span>
                               </div>);
                     }
                      return (<div key={index} className="layout-code">
                        <span>{codeValue[index]}</span>
                      </div>);
                     })}
                </div>
                <input
                  ref={(n) => { this.codeInput = n; }}
                  maxLength={len}
                  type={inputType}
                  className="code-input"
                  onFocus={self.focusHandle}
                  onBlur={self.blurHandle}
                  onInput={self.changeHandle}
                  value={codeValue}
                />
              </label>
            </div>
          </div>
        </div>
      </ContentTip>
    );
  }
}

export default Code;
