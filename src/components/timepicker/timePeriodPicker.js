import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Picker from '../picker/picker.js'
class TimePeriod extends Component {
  constructor () {
    super()
  }

  static propTypes = {
    value: PropTypes.array,
    open: PropTypes.bool,
    pickerAway: PropTypes.func
  }

  static defaultProps = {
    textvalue: '',
    delay: 10,  // 延迟分钟（分钟）
    timeFrame: 30,  // 时间范围（小时）
    pickerAway() {},
    open: false,
    unit: '次日',
    titleName: '每日可用时间段',
    value: ['09:00', '23:00']
  }

  componentWillMount () {
    let {value} = this.props,
      startTimeArr = this._setStartTime(),
      endTimeArr = this._setEndTime(value[0])
    // 设置默认显示参数
    this.setState({
      value: [value ? value[0] : startTimeArr[0], value ? value[1] : endTimeArr[0]], // 默认数值 开始时间 、 结束时间
      options: [startTimeArr, endTimeArr] // 默认数值
    })
  }

  onChange (val, text, listIndex) {
    // 当改变开始时间时
    let {value, options} = this.state,
      startTime = value[0],
      endTime = value[1]
    // 当改变开始时间时
    if (listIndex == 0) {
      let endTimeArr = this._setEndTime(val),
        endTimeVal = this.checkEndTimeIsBefore(val, endTime) ? endTimeArr[0] : endTime
      this.setState({
        value: [val, endTimeVal],
        options: [options[0], endTimeArr]
      })
    } else {
      this.setState({
        value: [startTime, val]
      })
    }
  }

  // 检测结束时间是否早于开始时间  true 早于， false 晚于
  checkEndTimeIsBefore (startTime, endTime) {
    let {unit} = this.props,
      splitStartTime = startTime.split(':'),
      splitEndTime = endTime.split(':')

    // 如果 endTime 带有 次日 返回 false
    if (endTime.indexOf(unit) > -1) {
      return false
    }
    // 对比小时
    if (Number(splitEndTime[0]) > Number(splitStartTime[0])) {
      return false
    }
    // 对比分钟
    if (Number(splitEndTime[1]) > Number(splitStartTime[1])) {
      return false
    }
    return true
  }

  onClickAway () {
    this.props.pickerAway && this.props.pickerAway(this.state.value, this.refs.pickertime)
  }

  render () {
    let {textvalue, open, titleName} = this.props,{options, value} = this.state

    return <div>
             <div className='pickertime' onClick={this.show.bind(this)} ref='pickertime'>
               {textvalue}
             </div>
             <Picker
               ref='date_picker'
               value={value}
               options={options}
               onChange={this.onChange.bind(this)}
               onClickAway={this.onClickAway.bind(this)}
               open={open}
               titleName={titleName} />
           </div>
  }

  show () {
    this.refs.date_picker.show()
  }

  // 设置开始时间
  _setStartTime () {
    let { delay } = this.props,
      startArr = [],
      mdelay = 60 / delay
    for (var i = 0,len = 24; i < len; i++) {
      for (var mi = 0,mlen = mdelay; mi < mlen; mi++) {
        let newi = i < 10 ? `0${i}` : i,
          newmi = mi * delay < 10 ? `0${mi * delay}` : mi * delay
        startArr.push(`${newi}:${newmi}`)
      }
    }
    return startArr
  }

  // 设置结束时间
  _setEndTime (startTime = '00:00') {
    let { delay, unit } = this.props,
      startArr = [],
      mdelay = 60 / delay,
      splitStartTime = startTime.split(':'),
      startH = Number(splitStartTime[0]),
      startM = Number(splitStartTime[1]),
      endArr = []
    for (var i = startH, len = 31 + startH; i < len; i++) {
      if (i < 48) {
        for (var mi = 0,mlen = mdelay; mi < mlen; mi++) {
          let newi = i < 10 ? `0${i}` : i
          if (startH == i && mi * delay <= startM) {
          }else if (startH + 30 == i && mi * delay > startM) {
          }else {
            let newmi = mi * delay < 10 ? `0${mi * delay}` : mi * delay
            if (newi >= 24) {
              newi = `${unit}${newi - 24 < 10 ? `0${newi - 24}` : newi - 24}`
            }
            endArr.push(`${newi}:${newmi}`)
          }
        }
      }
    }
    return endArr
  }

}

module.exports = TimePeriod
