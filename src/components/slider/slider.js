/**
 * Created by yanshenshen on 17/04/10.
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Slider extends React.Component {
  static propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    defaultValue: PropTypes.number,
    onChangeBack: PropTypes.func,
    disabled: PropTypes.bool,
    // colorStageGroup: PropTypes.array,
    isShading: PropTypes.bool,
    // colorGroup: PropTypes.array,
  }

  static defaultProps = {
    min: 0, // 最小值
    max: 10, // 最大值
    defaultValue: 0, // 设置初始取值
    disabled: false, // 值为 true 时，滑块为禁用状态
    onChangeBack() {}, // 会触发 onChange 事件，并把改变后的值作为参数传入
    colorStageGroup: [4], // 颜色阶级显示分介数值
    isShading: false, // 颜色是否缓动
    colorGroup: ['#108ee9', '#108ee9'], // 颜色阶级显示分介颜色值（数量要比colorStageGroup多一个）
  }

  constructor(props) {
    super(props);
    this.state = {
      maxWidth: document.body.offsetWidth,
      everyWidth: 10,
    };
    this.eventMoveStart = this.eventMoveStart.bind(this);
    this.eventMove = this.eventMove.bind(this);
  }

  componentDidMount() {
    this.initDraw(this.props);
  }


  setBgColor(stage) {
    const {
      startR, startG, startB, stageR, stageG, stageB,
    } = this.state;
    const nowR = parseInt(startR + (stageR * stage), 10);
    const nowG = parseInt(startG + (stageG * stage), 10);
    const nowB = parseInt(startB + (stageB * stage), 10);

    return {
      r: nowR,
      g: nowG,
      b: nowB,
    };
  }

  stepBgColor(step) {
    const { colorStageGroup } = this.props,
      len = colorStageGroup.length;

    for (let i = 0; i < len; i++) {
      if (len === 0) {
        if (colorStageGroup[i] >= step) {
          return 0;
        }
        return 1;
      }

      if (i === len - 1) {
        if (colorStageGroup[i] >= step) {
          return i;
        }
        return i + 1;
      }

      if (colorStageGroup[i] <= step && colorStageGroup[i + 1] > step) {
        return i;
      }
    }
  }

  eventMoveStart(e) {
    if (this.props.disabled) {
      return false;
    }
    // 阻止window窗体滚动
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    this.move(e);
    return true;
  }

  eventMove(e) {
    if (this.props.disabled) {
      return false;
    }
    // 阻止window窗体滚动
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    this.move(e);
    return true;
  }

  initDraw(props) {
    const { wrapLay, sliderBnt, lineLight } = this,
      {
        max, min, defaultValue, disabled, isShading, colorGroup,
      } = props,
      totle = max - min,
      everyWidth = Number(wrapLay.clientWidth) / totle,
      // 设置初始背景颜色
      startBgColor = colorGroup[0],
      endBgColor = colorGroup[colorGroup.length - 1],
      reg = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;

    if (!reg.test(startBgColor) || !reg.test(endBgColor)) {
      console.error('颜色格式错误');
      return false;
    }

    // 设置 开始和结束的 r g b 颜色的值

    let startR,
      startG,
      startB,
      endR,
      endG,
      endB;

    if (startBgColor.length === 4) {
      startR = parseInt(startBgColor.substring(1, 2) + startBgColor.substring(1, 2), 16);
      startG = parseInt(startBgColor.substring(2, 3) + startBgColor.substring(2, 3), 16);
      startB = parseInt(startBgColor.substring(3, 4) + startBgColor.substring(3, 4), 16);
    } else {
      startR = parseInt(startBgColor.substring(1, 3), 16);
      startG = parseInt(startBgColor.substring(3, 5), 16);
      startB = parseInt(startBgColor.substring(5, 7), 16);
    }

    if (endBgColor.length === 4) {
      endR = parseInt(endBgColor.substring(1, 2) + endBgColor.substring(1, 2), 16);
      endG = parseInt(endBgColor.substring(2, 3) + endBgColor.substring(2, 3), 16);
      endB = parseInt(endBgColor.substring(3, 4) + endBgColor.substring(3, 4), 16);
    } else {
      endR = parseInt(endBgColor.substring(1, 3), 16);
      endG = parseInt(endBgColor.substring(3, 5), 16);
      endB = parseInt(endBgColor.substring(5, 7), 16);
    }

    const stageR = endR - startR,
      stageG = endG - startG,
      stageB = endB - startB;

    this.setState({
      maxWidth: wrapLay.clientWidth,
      everyWidth,
      offsetLeft: wrapLay.offsetLeft,
      startR,
      startG,
      startB,
      // endR,
      // endG,
      // endB,
      stageR,
      stageG,
      stageB,
    });

    // 设置初始位置
    sliderBnt.style.left = `${(defaultValue - min) * everyWidth}px`;
    lineLight.style.width = `${(defaultValue - min) * everyWidth}px`;

    // 设置初始颜色
    if (!disabled && isShading) {
      const nowR = parseInt(startR + ((stageR * defaultValue) / totle), 10),
        nowG = parseInt(startG + ((stageG * defaultValue) / totle), 10),
        nowB = parseInt(startB + ((stageB * defaultValue) / totle), 10);
      lineLight.style.backgroundColor = `rgb(${nowR}, ${nowG}, ${nowB})`;
    }

    // 设置阶段颜色值
    if (!disabled && !isShading) {
      lineLight.style.backgroundColor = colorGroup[this.stepBgColor(defaultValue)];
    }
  }

  move(e) {
    const {
        isShading, colorGroup, min, onChangeBack,
      } = this.props,
      { sliderBnt, lineLight } = this,
      { everyWidth, offsetLeft } = this.state;
    let pageX = e.touches[0].pageX - offsetLeft;

    pageX = pageX < 0 ? 0 : pageX;
    pageX = pageX > this.state.maxWidth ? this.state.maxWidth : pageX;

    const onvalue = pageX < 50 ? Math.floor(pageX / everyWidth) + min :
      Math.ceil(pageX / everyWidth) + min;
    sliderBnt.style.left = `${pageX}px`;
    lineLight.style.width = `${pageX}px`;
    if (onChangeBack) {
      onChangeBack({
        value: onvalue,
      });
    }
    if (isShading) {
      const newColor = this.setBgColor(pageX / this.state.maxWidth);
      lineLight.style.backgroundColor = `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
    }
    // 设置阶段颜色值
    if (!isShading) {
      lineLight.style.backgroundColor = colorGroup[this.stepBgColor(onvalue)];
    }
  }

  render() {
    const { disabled, className } = this.props,
      cls = classNames({
        'jimu-slider': true,
        'jimu-disabled': disabled,
        [className]: className,
      });

    return (
      <div className={cls} ref={(u) => { this.wrapLay = u; }}>
        {this.props.children && (
        <div className="brd">
          {this.props.children}
        </div>
         )}
        <div className="line-layout" onTouchMove={this.eventMove} onTouchStart={this.eventMoveStart}>
          <div className="line-bg" />
          <div className="line-light" ref={(u) => { this.lineLight = u; }} />
          <div className="slider-bnt" ref={(u) => { this.sliderBnt = u; }} />
        </div>
      </div>
    );
  }
}

export default Slider;
