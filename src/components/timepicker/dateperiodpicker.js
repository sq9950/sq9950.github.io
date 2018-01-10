import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Picker from '../picker/picker.js'
class DatePeriodPicker extends Component {
  constructor () {
    super()
  }

  static propTypes = {
    value: PropTypes.array,
    open: PropTypes.bool,
    pickerAway: PropTypes.func,
    days: PropTypes.number
  }

  static defaultProps = {
    textvalue: '时间组件按钮',
    pickerAway() {},
    open: false,
    format: ['年', '月', '日'],
    days: 7, // 显示时间段
    startData: '', // 开始时间 2017/12/29
    weekText: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  }

  componentWillMount () {
    let {value, open, days, startData, format} = this.props,
      timeArr = [],
      startDay = '',
      endDay = ''

    // 判断是否传入开始日期 并且检验传入日期是否有效
    if (startData && this.isEffectiveDate(startData)) {
      startDay = startData
    }else {
      startDay = this._getNewDate()
    }

    endDay = this._getEndData(startDay, days - 1)

    // 设置初始数组
    let opts = this._setInitOptions(startDay, endDay, startDay),
      newArrValue = startDay.split('/')

    // 设置默认显示参数
    this.setState({
      value: [this._addStrUnit(newArrValue[0], format[0]), this._addStrUnit(newArrValue[1], format[1]), this._setDaysWeek(newArrValue[0], newArrValue[1], newArrValue[2])], // 默认数值 开始时间 、 结束时间
      options: opts, // 默认数值
      open: open,
      startD: startDay,
      endD: endDay,
      valueD: newArrValue
    })
  }

  // 设置 options 当前年月日
  _setInitOptions (startDay, endDay, onDay) {
    let self = this,{format} = this.props,
      start = startDay.split('/'),
      end = endDay.split('/'),
      on = onDay.split('/'),
      opt = [],
      /* opt 年月日 数组 */
      year = [],
      mouth = [],
      day = [],

      /* 开始、结束、当前 年月日 */
      ys = Number(start[0]),
      ye = Number(end[0]),
      yon = Number(on[0]),
      ms = Number(start[1]),
      me = Number(end[1]),
      mon = Number(on[1]),
      ds = Number(start[2]),
      de = Number(end[2]),
      don = Number(on[2]),

      optms = 1,
      optme = 12,
      optds = 1,
      optde = this._getDays(yon, mon)

    // 如果同年 2017/3/5 2017/6/7
    if (ys == yon && yon == ye) {
      optms = ms
      optme = me
      // 月份相同
      if (mon == me && mon == ms) {
        optds = ds
        optde = de
      }else {
        // 如果 当前月份 与 开始月份相同
        if (mon == ms) {
          optds = ds
        }
        // 如果 当前月份 与 结束月份相同
        if (mon == me) {
          optds = 1
          optde = de
        }
      }
    }else {
      // 如果不同年 2016/3/5 2017 /6/7
      // 如果当前年份与结束年份相等
      if (yon == ys) {
        optme = 12
        optms = ms
        // 如果 当前月份 与 开始月份相同
        if (mon == ms) {
          optds = ds
        }
        // 如果 当前月份 与 结束月份相同
        if (mon == me) {
          optds = 1
        }
      }

      if (yon == ye) {
        optms = 1
        optme = me

        // 如果 当前月份 与 结束月份相同
        if (mon == me) {
          optds = 1
          optde = de
        }
      }
    }

    // 设置 年份
    for (; ys <= ye; ys++) {
      year.push(this._addStrUnit(ys, format[0]))
    }

    // 设置 月份
    for (; optms <= optme; optms++) {
      mouth.push(this._addStrUnit(optms, format[1]))
    }

    // 设置 天
    for (; optds <= optde; optds++) {
      day.push(this._setDaysWeek(yon, mon, optds))
    }

    return opt = [year, mouth, day]
  }

  _setDaysWeek (yon, mon, optds) {
    let nowdt = `${yon}/${mon}/${optds}`,
      week = new Date(nowdt).getDay(),
      newdaysopt = `${optds}日 ${this.props.weekText[week]}`
    return newdaysopt
  }

  onChange (val, text , listIndex) {
    let {format} = this.props,{startD, endD, value, valueD} = this.state,
      newDataArr = value, // 当前时间数组
      startDataArr = startD.split('/'), // 起始时间数组
      onData = valueD // 当前时间数组

    // 当改变年份时
    if (listIndex == 0) {
      let yearval = this._deleteStrUnit(val, format[0])
      // 当前年份
      if (startD.split('/')[0] == yearval) {
        onData = [yearval, startDataArr[1], startDataArr[2]]
      }else {
        onData = [yearval, 1, 1]
      }
    }

    // 当改变月份时
    if (listIndex == 1) {
      let mouthval = this._deleteStrUnit(val, format[1])
      // 当前年份
      if (startDataArr[0] == onData[0] && startDataArr[1] == mouthval) {
        onData = [startDataArr[0], mouthval, startDataArr[2]]
      }else {
        onData = [onData[0], mouthval, 1]
      }
    }

    // 当改变日时
    if (listIndex == 2) {
      onData[2] = this._deleteStrUnit(val, format[2])
    }

    newDataArr = [this._addStrUnit(onData[0], format[0]), this._addStrUnit(onData[1], format[1]), this._setDaysWeek(onData[0], onData[1], onData[2])]

    this.setState({
      value: newDataArr,
      options: this._setInitOptions(startD, endD, onData.join('/')),
      valueD: onData
    })
  }

  // 数组添加单位
  _addArrUnit (arr, unit) {
    arr.map(function (re, i) {
      return `${re}${unit}`
    })
  }

  // 数组删除单位
  _deleteArrUnit (arr, unit) {
    arr.map(function (re, i) {
      return re.split(unit)[0]
    })
  }

  // 字符串添加单位
  _addStrUnit (string, unit) {
    return `${string}${unit}`
  }

  // 字符串删除单位
  _deleteStrUnit (string, unit) {
    return string.split(unit)[0]
  }

  // 判断是否为有效日期
  isEffectiveDate (data) {
    let dataArr = data.split('/'),
      intYear = dataArr[0],
      intMonth = dataArr[1],
      intDay = dataArr[2]
    if (isNaN(intYear) || isNaN(intMonth) || isNaN(intDay)) return false
    if (intMonth > 12 || intMonth < 1) return false
    if (intDay < 1 || intDay > 31) return false
    if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intDay > 30)) return false
    if (intMonth == 2) {
      if (intDay > 29) return false
      if ((((intYear % 100 == 0) && (intYear % 400 != 0)) || (intYear % 4 != 0)) && (intDay > 28))return false
    }
    return true
  }

  // 获取 结束时间
  _getEndData (startData, days) {
    let nowTamp = this._dataTransTamp(startData) + days * 60 * 60 * 1000 * 24
    return this._tampTransData(nowTamp)
  }

  // 时间戳转换时间
  _tampTransData (tamp) {
    let d = new Date(parseInt(tamp))
    return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()
  }

  // 时间转换时间戳
  _dataTransTamp (data) {
    return new Date(data).getTime()
  }

  // 设置结束小时参数值
  _pushEndHour (starthour) {
    let endA = []
    for (var i = starthour + 1; i <= 24; i++) {
      endA.push(i)
    }
    return endA
  }

  // 设置delay 以后时间 日期格式化  yyyy-MM-dd hh:mm ; yyyy/MM/dd hh:mm
  setDateFormat (nowdate, fmt) {
    let {delay} = this.props,
      deleytamp = new Date(nowdate).getTime() + 60 * 1000 * delay,
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
        m: date.getMinutes()
      }
    }
  }

  onClickAway () {
    let {format} = this.props,{value} = this.state,
      dataString = ''
    dataString += value[0].split(format[0])[0] + '/'
    dataString += value[1].split(format[1])[0] + '/'
    dataString += value[2].split(format[2])[0]

    let fmt = new Date(dataString + ' 00:00').getTime()
    this.props.pickerAway && this.props.pickerAway(value, this.refs.pickertime, {
      fmt,
      data: dataString
    })
  }

  render () {
    const {bntTest, textvalue} = this.props

    return (
      <div className='dataPicker'>
        <div className='pickertime' onClick={this._onClick.bind(this)} ref='pickertime'>
          {bntTest || textvalue}
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
  show () {
    this.refs.date_picker.show()
  }

  _onClick () {
    this.refs.date_picker.show()
  }

  // 获取当前月份参数
  _getDays (y, m) {
    return new Date(y, m, 0).getDate()
  }

  _getNewDate () {
    let d = new Date()
    return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()
  }
}

module.exports = DatePeriodPicker
