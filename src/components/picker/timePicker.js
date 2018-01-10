import React, {
  Component,
} from 'react';
import Picker from './picker.js';

class PickerTime extends Component {
  constructor() {
    super();
    this.initoptions.bind(this);
  }

  onChange(value, text, listIndex) {
    const val = this.state.value.slice(0);
    const options = this.state.options.slice(0);
    const len = this.state.options.length;
    const { startTime } = this.state;

    val[listIndex] = text;
    this.setState({
      vallue: val,
    });
    // 首先判断一下是不是三列
    if (len === 3) {
      // 初始化小时的数组
      const harr = [];
      // 初始化分钟的数组
      let marr = [];
      // 把开始时间分解
      const startArr = startTime.split(':');
      // 获取到开始时间的小时
      const startTimeH = parseInt(startArr[0]);
      // 获取到开始时间的分钟
      const startTimeM = parseInt(startArr[1]);

      // 滑动的时候判读一下是不是第一项
      if (listIndex === 0) {
        // 如果是当日的话
        if (value === '当日') {
          // 选日的时候只触发时的重新渲染
          // 初始化一下最小值
          this.initoptions(startTime);
        } else if (value === '次日') {
          // 初始化一下最小值
          // 初始化开始小时
          let maxH = startTimeH;
          // 如果分钟为0的时候，最大小时数要减一
          if (startTimeM === 0) {
            maxH--;
          }
          // 开始初始化时小时数组
          for (let i = 0; i <= maxH; i++) {
            harr.push(`${i < 10 ? `0${i}` : i}时`);
          }
          // 开始初始化时小时数组
          if (maxH === 0) {
            if (startTimeM === 0) {
              marr = this.generateM(12);
            } else {
              marr = this.generateM((startTimeM / 5));
            }
          } else {
            marr = this.generateM(12);
          }
          options[1] = harr;
          options[2] = marr;
          this.setState({
            options,
            value: [options[0][1], harr[0], marr[0]],
          });
        }
      // 如果滑动的是小时的话
      } else if (listIndex === 1) {
        if (this.state.value[0] === '当日') {
          marr = this.generateM(12);
          // 如果是55则不用管，因为下一个是从00开始
          if (startTimeM != 55) {
            // 循环全部分钟值
            if (parseInt(value) == startTimeH) {
              marr = [];
              // 如果是第一项的话  并且上一项的分钟不是55
              for (let i = (startTimeM / 5 + 1); i < 12; i++) {
                const m = i * 5;
                marr.push(`${m < 10 ? `0${m}` : m}分`);
              }
            }
          }
        } else if (this.state.value[0] === '次日') {
          // 先按默认来循环一遍
          marr = this.generateM(12);
          if (startTimeM != 0) {
            if (parseInt(value) == startTimeH) {
              marr = this.generateM((startTimeM / 5));
            }
          }
        }
        const _val = this.state.value.splice(0);
        _val[2] = marr[0];
        options[2] = marr;
        this.setState({
          options,
          value: _val,
        });
      }
    }
  }
  componentWillReceiveProps(nextprops) {
    const startTime = nextprops.startTime;

    if (startTime) {
      this.setState({
        startTime,
      });
      this.initoptions(startTime);
    }
  }
  initoptions(startTime) {
    const startArr = startTime.split(':');
    const startTimeH = parseInt(startArr[0]);
    const startTimeM = parseInt(startArr[1]);
    const options = this.state.options.slice(0);

    const harr = [];
    const marr = [];
    // 选日的时候只触发时的重新渲染
    // 初始化一下最小值
    let minH = startTimeH;

    if (startTimeM === 55) {
      // 如果是55的话，则加小时往后加1
      minH++;
    }


    for (let i = minH; i < 24; i++) {
      // 初始化小时
      harr.push(`${i < 10 ? `0${i}` : i}时`);
    }


    if (startTimeM != 55) {
      // 如果是第一项的话  并且上一项的分钟不是时间正常计算

      for (let i = (startTimeM / 5 + 1); i < 12; i++) {
        // 初始化第一项的分钟
        const m = i * 5;
        marr.push(`${m < 10 ? `0${m}` : m}分`);
      }
      if (startTimeM == 0 && startTimeH == 0) {
        // 分钟和时间都为0的时候，不显示次日
        options[0] = ['当日'];
      } else {
        options[0] = ['当日', '次日'];
      }
    } else {
      // 如果时间是55
      // 如果小时等于23点
      if (startTimeH == 23) {
        // 那只能选次日
        options[0] = ['次日'];
        // 初始化小时
        for (let i = 0; i < 24; i++) {
          harr.push(`${i < 10 ? `0${i}` : i}时`);
        }
      }
      // 分钟按正常逻辑处理
      for (let i = 0; i < 12; i++) {
        const m = i * 5;
        marr.push(`${m < 10 ? `0${m}` : m}分`);
      }
    }

    options[1] = harr;
    options[2] = marr;
    this.setState({
      options,
      value: [options[0][0], harr[0], marr[0]],
    });
    // this.props.pickerAway([options[0][0], harr[0], marr[0]])
  }
  onClickAway(value, text) {
    this.props.pickerAway && this.props.pickerAway(this.state.value);
  }

  generateM(max) {
    const arr = [];
    for (let i = 0; i < max; i++) {
      const m = i * 5;
      arr.push(`${m < 10 ? `0${m}` : m}分`);
    }
    return arr;
  }
  render() {
    const self = this;
    const {
      options,
      startTime,
      textvalue,
    } = this.props;

    const valueArr = [];
    if (!this.state) {
      options.map(function (sr, index) {
        valueArr.push(arguments[0][0]);
      });
      this.state = {
        value: valueArr,
        startTime,
        options: this.props.options,
        pickerAway: this.props.pickerAway,
      };
      if (startTime) {
        self.initoptions(startTime);
      }
    }
    return;
      <div>
        <div className="pickertime">{textvalue}</div>
        <Picker
          ref="picker"
          value={this.state.value}
          startTime={this.state.startTime}
          options={this.state.options}
          onChange={this.onChange.bind(this)}
          onClickAway={this.onClickAway.bind(this)}
        />
      </div>;
  }
}

module.exports = PickerTime;
