import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Picker from '../picker/picker.js'
class DateRangePicker extends Component {
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
    pickerAway() {},
    open: false,
    valueData: '',
    startData: '2000/01/01', // 开始日期 2000/01/01
    endData: '' // 结束日期 2017/12/29
  }

  componentWillMount () {
    let {valueData, open, startData, endData} = this.props,
      timeArr = [],
      startDay = '',
      endDay = '',
      onDay = '',
      endDataTamp = !endData ? new Date().getTime() : this._dataTransTamp(endData),
      startDataTamp = this._dataTransTamp(startData),
      days = Math.ceil((endDataTamp - startDataTamp) / 1000 / 24 / 60 / 60)

    // 判断是否传入开始日期 并且检验传入日期是否有效
    if (startData && this.isEffectiveDate(startData)) {
      startDay = startData
    }else {
      startDay = this._getNewDate()
    }

    endDay = endData ? endData : this._getNewDate()
    onDay = valueData ? valueData : this._getNewDate()

    // 设置初始数组
    let opts = this._setInitOptions(startDay, endDay, onDay),
      // newArrValue = startDay.split("/"),
      dayList = onDay.split('/'),
      onDataValue = [dayList[0], Number(dayList[1]), Number(dayList[2])],
      onDataArr = [onDataValue[0] + '年', onDataValue[1] + '月', onDataValue[2] + '日']
    // 设置默认显示参数
    this.setState({
      options: opts, // 默认数值
      startD: startDay,
      endD: endDay,
      valueD: onDataValue,
      dayState: days,
      startDataState: startData,
      value: onDataArr,
      open,
    valueData})
  }

  componentWillReceiveProps (nextProps) {}

  // 设置 options 当前年月日
  _setInitOptions (startDay, endDay, onDay) {
    let self = this,
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
      year.push(this._addStrUnit(ys, '年'))
    }

    // 设置 月份
    for (; optms <= optme; optms++) {
      mouth.push(this._addStrUnit(optms, '月'))
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
      newdaysopt = `${optds}日`
    return newdaysopt
  }

  onChange (val, text , listIndex) {
    let {startD, endD, value, valueD, valueData, options} = this.state,
      newDataArr = valueData, // 当前时间数组
      startDataArr = startD.split('/'), // 起始时间数组
      onData = valueD // 当前时间数组

    if (this.initDraw) {
      this.setState({
        value: [valueD[0] + '年', valueD[1] + '月', valueD[2] + '日'],
        valueD,
      valueData})
      return false
    }

    // 当改变年份时
    if (listIndex == 0) {
      let yearval = this._deleteStrUnit(val, '年')
      // 当前年份
      if (startD.split('/')[0] == yearval) {
        onData = [yearval, startDataArr[1], startDataArr[2]]
      }else {
        onData[0] = yearval
      }

      // 判断 2月份是否是  29号
      if (valueD[2] == 29) {
        onData[2] = 28
      }
    }

    // 当改变月份时
    if (listIndex == 1) {
      let mouthval = this._deleteStrUnit(val, '月')
      // 当前年份
      if (startDataArr[0] == onData[0] && startDataArr[1] == mouthval) {
        onData = [startDataArr[0], mouthval, startDataArr[2]]
      }else {
        onData[1] = mouthval
      }
    }

    // 当改变日时
    if (listIndex == 2) {
      onData[2] = this._deleteStrUnit(val, '日')
    }

    newDataArr = [this._addStrUnit(onData[0], '年'), this._addStrUnit(onData[1], '月'), this._setDaysWeek(onData[0], onData[1], onData[2])]
    let opts = this._setInitOptions(startD, endD, onData.join('/'))
    // 判断当前年月是否包含当前的日  比如 2月 29

    if (opts[2].length < onData[2]) {
      onData[2] = 1
      newDataArr[2] = '1日'
    }

    if (opts[1].length < onData[1]) {
      onData[1] = 1
      newDataArr[1] = '1月'
    }

    let setValueData = onData.join('/')

    this.setState({
      value: newDataArr,
      valueD: onData,
      valueData: setValueData,
      options: opts
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

  onClickAway () {
    let {value, valueData} = this.state,
      dataString = ''
    dataString += this._deleteStrUnit(value[0], '年') + '/'
    dataString += this._deleteStrUnit(value[1], '月') + '/'
    dataString += this._deleteStrUnit(value[2], '日')
    let fmt = new Date(dataString + ' 00:00').getTime()
    this.props.pickerAway && this.props.pickerAway(value, this.refs.pickertime, valueData, {
      fmt,
      data: dataString
    })
  }

  render () {
    const {bntTest, textvalue} = this.props,{value, options, open} = this.state
    return (
      <div className='dataPicker'>
        <div className='pickertime' onClick={this._onClick.bind(this)} ref='pickertime'>
          {bntTest || textvalue}
        </div>
        <Picker
          ref='date_picker'
          value={value}
          options={options}
          onChange={this.onChange.bind(this)}
          onClickAway={this.onClickAway.bind(this)}
          open={open} />
      </div>
    )
  }
  show () {
    this._showFunc()
  }

  _onClick () {
    this._showFunc()
  }

  _showFunc () {
    if (this.props.valueData != this.state.valueData) {
      let {valueData, endData, startData} = this.props,
        valueDataArr = valueData.split('/'),
        endDay = endData ? endData : this._getNewDate(),
        onDay = valueData ? valueData : this._getNewDate(),
        startDay

      // 判断是否传入开始日期 并且检验传入日期是否有效
      if (startData && this.isEffectiveDate(startData)) {
        startDay = startData
      }else {
        startDay = this._getNewDate()
      }

      // 设置初始数组
      let self = this,
        options = this._setInitOptions(startDay, endDay, onDay),

        dayList = onDay.split('/'),
        onDataValue = [dayList[0], Number(dayList[1]), Number(dayList[2])],
        onDataArr = [onDataValue[0] + '年', onDataValue[1] + '月', onDataValue[2] + '日']

      this.setState({
        valueData,
        options,
        valueD: onDataValue,
        value: onDataArr
      })

      this.initDraw = true
      setTimeout(function () {
        self.initDraw = false
      }, 500)

    // this.refs.date_picker.show()
    }
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

module.exports = DateRangePicker
