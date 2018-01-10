import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Picker from '../picker/picker.js'
class TimeDefaultPicker extends Component {
  constructor () {
    super()
  }

  static propTypes = {
    open: PropTypes.bool,
    pickerAway: PropTypes.func,
    len: PropTypes.number
  }

  static defaultProps = {
    textvalue: '时间组件按钮',
    pickerAway() {},
    open: false,
    len: 7, // 展示天数
    format: ['M月d日', '点', '分'],
    delay: 5, // 与当前时间推迟（）分钟后，开始计时
    value: ['今天', '现在', ' '], // 默认数值
    optOneArr: ['今天', '明天', '后天'], // 第一栏默认名称
    scale: 10 //  分钟刻度
  }

  componentWillMount () {
    this.setInitState()
  }

  setInitState () {
    let {value, open, len, format} = this.props,
      // delay 以后获取时间
      dates = this.setDateFormat(new Date(), 'yyyy/MM/dd hh:mm')
    // 设置默认显示参数
    this.setState({
      startData: dates.fmt,
      value: value, // 默认数值 开始时间 、 结束时间
      options: [this._setInitData(dates.fmt, len), this._setInitHour(dates.datelist.h, true), [' ']], // 初始数值
      open: open
    })
  }

  // 设置初始日期展示
  _setInitData (startDate, len) {
    let self = this,{value, format, delay, optOneArr} = this.props,
      timestamp = new Date(startDate).getTime(),
      dataArr = []
    // 获取全部日期相关
    this.allData = []

    for (let i = 0; i < len; i++) {
      let tamp = timestamp + 24 * 60 * 60 * 1000 * i + 60 * 1000 * delay
      if (i < optOneArr.length) {
        dataArr.push(optOneArr[i])
      }else {
        dataArr.push(self.setDateFormat(new Date(parseInt(tamp)), format[0]).fmt)
      }

      this.allData.push(self.setDateFormat(new Date(parseInt(tamp)), 'yyyy/MM/dd').fmt)
    }

    // console.log(this.allData)
    return dataArr
  }

  // 设置初始小时展示   isOnday  是否当天
  _setInitHour (hour, isOnday) {
    let self = this,{value, format, scale} = this.props,
      hourArr = isOnday ? ['现在'] : [],
      deleytamp = new Date().getTime() + 60 * 1000 * scale,
      date = new Date(parseInt(deleytamp)),
      dates = this.setDateFormat(date, 'yyyy/MM/dd hh:mm'),
      gethour = isOnday ? dates.datelist.h : hour

    for (let i = gethour; i < 24; i++) {
      hourArr.push(i + format[1])
    }
    return hourArr
  }

  // 设置初始小时展示
  _setInitMinutes (minutes) {
    let self = this,{scale, value, format} = this.props,
      minutesArr = []
    for (let i = 0; i < 60; i++) {
      // minutesArr.push(i + format[1])
      if (!(i % scale)) {
        if (minutes <= i) {
          if (i < 10) { i = '0' + i}
          minutesArr.push(i + format[2])
        }
      }
    }
    return minutesArr
  }

  // 设置delay 以后时间 日期格式化  yyyy-MM-dd hh:mm ; yyyy/MM/dd hh:mm
  setDateFormat (nowdate, fmt , { isDelay = true } = {}) {
    // console.log(isDelay)
    let {delay} = this.props,
      deleytamp = isDelay ? (new Date(nowdate).getTime() + 60 * 1000 * delay) : (new Date(nowdate).getTime()),
      date = new Date(parseInt(deleytamp)),
      o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds() // 秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }

    return {
      fmt,
      datelist: {
        y: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
      }
    }
  }

  onClickAway () {
    let {optOneArr, format} = this.props,{value, options} = this.state,
      dates = this.setDateFormat(new Date(), 'yyyy/MM/dd hh:mm'),
      timestamp = new Date().getTime(),
      ondate = value[0],
      onhour = value[1],
      onminute = value[2],
      setValArr = value,
      len = options[0].length,
      dataString = '',
      fmt
    for (let i = 0; i < len; i++) {
      let tamp = timestamp + 24 * 60 * 60 * 1000 * i
      if (options[0][i] === ondate) {
        if (i < optOneArr.length) {
          dataString += this.setDateFormat(new Date(parseInt(tamp)), 'yyyy/MM/dd').fmt
        }else {
          dataString += this.allData[i]
        }
      }
    }
    if (onhour === '现在') {
      onhour = dates.datelist.h + format[1]
      onminute = dates.datelist.m + format[2]
      setValArr[2] = dates.datelist.m + format[2]
    }

    dataString += ` ${onhour.split(format[1])[0]}:${onminute.split(format[2])[0]}`
    fmt = new Date(dataString).getTime()

    this.props.pickerAway && this.props.pickerAway([ondate, onhour, onminute], this.refs.pickertime, setValArr, {
      fmt,
      data: this.setDateFormat(new Date(dataString), 'yyyy/MM/dd hh:mm', { isDelay: false }).fmt
    })
  }

  onChange (val, text , listIndex) {
    let {options, value} = this.state,{format, optOneArr} = this.props,
      days = options[0],
      hours = options[1],
      minutes = options[2],
      setHours = hours,
      setMinutes = minutes,
      dates = this.setDateFormat(new Date(), 'yyyy/MM/dd hh:mm'),
      onDay = value[0],
      onHours = value[1],
      onMinutes = value[2]

    // 日期更改时
    if (listIndex === 0) {
      if (val === days[0]) {
        setMinutes = []
        setHours = this._setInitHour(dates.datelist.h, true)
        onHours = '现在'
        onMinutes = ''
      }else {
        setHours = this._setInitHour(0, false)
        setMinutes = this._setInitMinutes(0)
        onHours = '0' + format[1]
        onMinutes = '00' + format[2]
      }
      onDay = val
    }

    // 小时修改时
    if (listIndex === 1) {
      if (onDay === optOneArr[0] && val === '现在') {
        setMinutes = []
        onMinutes = ''
      }else if (onDay === optOneArr[0] && val === dates.datelist.h + format[1]) {
        setMinutes = this._setInitMinutes(dates.datelist.m)
        onMinutes = this._setInitMinutes(dates.datelist.m)[0]
      }else {
        onMinutes = '00' + format[2]
        setMinutes = this._setInitMinutes(0)
      }
      onHours = val
    }

    if (listIndex === 2) {
      onMinutes = val
    }

    this.setState({
      value: [onDay, onHours, onMinutes],
      options: [days, setHours, setMinutes]
    })
  }

  render () {
    const {textvalue} = this.props

    return (
      <div className='dataPicker'>
        <div className='pickertime' onClick={this._onClick.bind(this)} ref='pickertime'>
          {textvalue}
        </div>
        <Picker
          ref='date_picker'
          value={this.state.value}
          options={this.state.options}
          onChange={this.onChange.bind(this)}
          onClickAway={this.onClickAway.bind(this)}
          open={this.state.open} />
      </div>
    )
  }

  _onClick () {
    this.refs.date_picker.show()
  }

  show () {
    this.refs.date_picker.show()
  }
}

module.exports = TimeDefaultPicker
