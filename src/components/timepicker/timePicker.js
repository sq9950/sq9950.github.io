import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Picker from '../picker/picker.js'
class PickerTime extends Component {
  constructor () {
    super()
    this.initoptions = this.initoptions.bind(this)
  }
  // getDefaultProps: function() {
  //   return {
  //     options: 'default value'
  //   }
  // }
  static propTypes = {
    // value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
    // options: PropTypes.array.isRequired,
    // onChange: PropTypes.func,
    // onShow: PropTypes.func,
    // onDismiss: PropTypes.func,
    // onClickAway: PropTypes.func,
    // width: PropTypes.string
    options: PropTypes.object.isRequired
  }

  componentWillMount () {
    let {startTime, endTime, scale, value, day, open} = this.props.options
    // 默认5分钟的刻度
    scale = scale || 5
    day = day || 3
    open = open || false
    let alloptions,dayarr = [],marr = [],harr = []
    // options 全值
    for (let i = 0; i < day; i++) {
      switch (i) {
        case 0:
          dayarr.push('今日')
          break
        case 1:
          dayarr.push('次日')
          break
        case 2:
          dayarr.push('后天')
          break
        default:
          dayarr.push(this._getDay(i))
          break
      }
    }
    for (let i = 0;i < 60;i++) {
      if (i < 24) {
        harr.push((i < 10 ? '0' + i : i) + '时')
      }
      if (!(i % scale)) {
        marr.push((i < 10 ? '0' + i : i) + '分')
      }
    }
    alloptions = [dayarr, harr, marr]
    this.setState({
      alloptions: alloptions
    })
    this._getoptionvalue(alloptions, startTime, endTime, scale, value, day, open)
  }

  generateM (max) {
    let arr = []
    for (let i = 0;i < max;i++) {
      const m = i * 5
      arr.push((m < 10 ? '0' + m : m) + '分')
    }
    return arr
  }
  generateH (ax) {}

  onChange (value, text, listIndex) {
    let val = this.state.value.slice(0),
      options = this.state.options.slice(0),
      len = this.state.options.length,
      starttime = this.state.starttime,
      newvalue,
      daylength = options[0].length
    const {alloptions, endtime, scale, day} = this.state

    // day变化
    if (len === 3 && listIndex === 0) {
      // 天数的位置
      // day不可能只有一天 否则无change
      let dayindex = options[0].indexOf(value)
      if (dayindex === 0 && starttime) {
        // 第一天并且有start值并且最后一天和第一天不是同一天
        let startTimeD = parseInt(starttime[0]),
          startTimeH = parseInt(starttime[1]),
          startTimeM = parseInt(starttime[2])
        let lastmin = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2))
        if (lastmin < startTimeM) {
          startTimeH++
          startTimeM = 0
        }
        if (startTimeH > 23) {
          startTimeD++
          startTimeH = 0
        }
        options = [options[0], alloptions[1].slice(startTimeH), alloptions[2].slice(Math.ceil(startTimeM / scale))]
      }else if (dayindex === daylength - 1 && endtime) {
        // 最后一天并且有end值
        let endTimeD = parseInt(endtime[0]),
          endTimeH = parseInt(endtime[1]),
          endTimeM = parseInt(endtime[2])
        options = [options[0], alloptions[1].slice(0, endTimeH + 1), alloptions[2].slice(0, Math.ceil((endTimeM + 1) / scale))]
      }else {
        // hour min为全值
        options = [options[0], alloptions[1], alloptions[2]]
      }
      newvalue = [value, options[1][0], options[2][0]]
      this.setState({
        options: options,
        value: newvalue
      })
    }else if ((len === 3 && listIndex === 1) || (len === 2 && listIndex === 0)) {
      // hour变化
      let dayindex = options[0].indexOf(val[0]),
        hourindex = options[1].indexOf(val[1]),
        hourlen = options[1].length
      if (dayindex === 0 && hourindex === 0 && starttime) {
        // 第一天 第一个hour 并且有start值
        let startTimeD = parseInt(starttime[0]),
          startTimeH = parseInt(starttime[1]),
          startTimeM = parseInt(starttime[2])
        let lastmin = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2))
        if (lastmin < startTimeM) {
          startTimeH++
          startTimeM = 0
        }
        if (startTimeH > 23) {
          startTimeD++
          startTimeH = 0
        }
        // newvalue = [val[0] ,alloptions[1][0],alloptions[2]]
        options = [options[0], options[1], alloptions[2].slice(Math.ceil(startTimeM / scale))]
      }else if (dayindex === daylength - 1 && hourindex === hourlen - 1 && endtime) {
        // 最后一天 最后一个hour 并且有end值
        let endTimeM = parseInt(endtime[2])
        options = [options[0], options[1], alloptions[2].slice(0, Math.ceil((endTimeM + 1) / scale))]
      // newvalue = [val[0] ,alloptions[1][0],alloptions[2]]
      }else {
        // hour da不变 min为全值
        options = [options[0], options[1], alloptions[2]]
      }
      newvalue = [val[0], value, options[2][0]]
      this.setState({
        options: options,
        value: newvalue
      })
    }
  // val[listIndex]=text
  // this.setState({
  //   value:val
  // })
  // 首先判断一下是不是三列
  // if(len===3){
  //   //初始化小时的数组
  //   let harr=[]
  //   //初始化分钟的数组
  //   let marr=[]
  //   //把开始时间分解
  //   const startArr=startTime.split(":")
  //   //获取到开始时间的小时
  //   const startTimeH=parseInt(startArr[0])
  //   //获取到开始时间的分钟
  //   const startTimeM=parseInt(startArr[1])
  //
  //   //滑动的时候判读一下是不是第一项
  //   if(listIndex===0){
  //     //如果是当日的话
  //     if(value==="当日"){
  //       //选日的时候只触发时的重新渲染
  //       //初始化一下最小值
  //       this.initoptions(startTime)
  //     }else if (value === "次日"){
  //       //初始化一下最小值
  //       //初始化开始小时
  //       let maxH=startTimeH
  //       //如果分钟为0的时候，最大小时数要减一
  //       if(startTimeM===0){
  //         maxH--
  //       }
  //       //开始初始化时小时数组
  //       for(let i=0;i<=maxH;i++){
  //         harr.push((i<10?"0"+i:i)+"时")
  //       }
  //       //开始初始化时小时数组
  //       if(maxH === 0){
  //         if(startTimeM===0){
  //           marr=this.generateM(12)
  //         }else{
  //           marr=this.generateM((startTimeM/5))
  //         }
  //       }else{
  //         marr=this.generateM(12)
  //       }
  //       options[1]=harr
  //       options[2]=marr
  //       this.setState({
  //         options:options,
  //         value:[options[0][1], harr[0], marr[0]]
  //       })
  //     }
  //   //如果滑动的是小时的话
  //   }else if (listIndex===1){
  //     if(this.state.value[0]==="当日"){
  //       marr=this.generateM(12)
  //       //如果是55则不用管，因为下一个是从00开始
  //       if(startTimeM!=55){
  //         //循环全部分钟值
  //         if(parseInt(value)==startTimeH){
  //           marr=[]
  //           //如果是第一项的话  并且上一项的分钟不是55
  //           for(let i=(startTimeM/5+1);i<12;i++){
  //             const m=i*5
  //             marr.push((m<10?"0"+m:m)+"分")
  //           }
  //         }
  //       }
  //     }else if (this.state.value[0]==="次日"){
  //       //先按默认来循环一遍
  //       marr=this.generateM(12)
  //       if(startTimeM!=0){
  //         if(parseInt(value)==startTimeH){
  //           marr=this.generateM((startTimeM/5))
  //         }
  //       }
  //     }
  //     let _val=this.state.value.splice(0)
  //     _val[2]=marr[0]
  //     options[2]=marr
  //     this.setState({
  //       options:options,
  //       value:_val
  //     })
  //   }
  // }
  }
  componentWillReceiveProps (nextprops) {
    const startTime = nextprops.startTime

    if (startTime) {
      this.setState({
        startTime: startTime
      })
      this.initoptions(startTime)
    }
  }
  initoptions (startTime) {
    const startArr = startTime.split(':')
    const startTimeH = parseInt(startArr[0])
    const startTimeM = parseInt(startArr[1])
    const options = this.state.options.slice(0)

    const harr = []
    const marr = []
    // 选日的时候只触发时的重新渲染
    // 初始化一下最小值
    let minH = startTimeH

    if (startTimeM === 55) {
      // 如果是55的话，则加小时往后加1
      minH++
    }

    for (let i = minH;i < 24;i++) {
      // 初始化小时
      harr.push((i < 10 ? '0' + i : i) + '时')
    }

    if (startTimeM != 55) {

      // 如果是第一项的话  并且上一项的分钟不是时间正常计算

      for (let i = (startTimeM / 5 + 1);i < 12;i++) {
        // 初始化第一项的分钟
        const m = i * 5
        marr.push((m < 10 ? '0' + m : m) + '分')
      }
      if (startTimeM == 0 && startTimeH == 0) {
        // 分钟和时间都为0的时候，不显示次日
        options[0] = ['当日']
      }else {
        options[0] = ['当日', '次日']
      }
    }else {
      // 如果时间是55
      // 如果小时等于23点
      if (startTimeH == 23) {
        // 那只能选次日
        options[0] = ['次日']
        // 初始化小时
        for (let i = 0;i < 24;i++) {
          harr.push((i < 10 ? '0' + i : i) + '时')
        }
      }
      // 分钟按正常逻辑处理
      for (let i = 0;i < 12;i++) {
        const m = i * 5
        marr.push((m < 10 ? '0' + m : m) + '分')
      }
    }

    options[1] = harr
    options[2] = marr
    this.setState({
      options: options,
      value: [options[0][0], harr[0], marr[0]]
    })
  // this.props.pickerAway([options[0][0], harr[0], marr[0]])
  }
  onClickAway (value, text, listIndex) {
    this.props.pickerAway && this.props.pickerAway(this.state.value, this.refs.pickertime)
  }

  render () {
    const self = this
    const {textvalue} = this.props

    if (!this.state) {

      // if(startTime){
      //   self.initoptions(startTime)
      // }
    }
    return <div>
             <div className='pickertime' onClick={this._onClick.bind(this)} ref='pickertime'>
               {textvalue}
             </div>
             <Picker
               ref='picker'
               value={this.state.value}
               options={this.state.options}
               onChange={this.onChange.bind(this)}
               onClickAway={this.onClickAway.bind(this)}
               open={this.state.open} />
           </div>
  }

  _onClick () {
    this.refs.picker.show()
  }

  show () {
    this.refs.picker.show()
  }

  _compare (startTime, endTime) {
    if (startTime && endTime) {
      let result = 0
      startTime.forEach(function (item, i) {
        if ((startTime[i] > endTime[i]) && result == 0) {
          result = 1
        }else if ((startTime[i] < endTime[i]) && result == 0) {
          result = 2
        }
      })
      if (result == 2) return true
      else return false
    }else {
      return true
    }
  }

  _setTimeForStart (startTime, options) {}

  _getDay (i) {
    let today = new Date()
  }
  // 初始化iotions
  _getoptionvalue (alloptions, startTime, endTime, scale, value, day, open) {
    let options,valuearr = []
    let dayarr ,harr ,marr
    // let dayarr = alloptions[0],harr = alloptions[1],marr = alloptions[2]
    // let alldayarr, allharr, allmarr

    if (startTime && !endTime) {
      let startTimeD = parseInt(startTime[0]),
        startTimeH = parseInt(startTime[1]),
        startTimeM = parseInt(startTime[2])
      let lastmin = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2))
      if (lastmin < startTimeM) {
        startTimeH++
        startTimeM = 0
      }
      if (startTimeH > 23) {
        startTimeD++
        startTimeH = 0
      }
      dayarr = alloptions[0].slice(startTimeD)
      harr = alloptions[1].slice(startTimeH)
      marr = alloptions[2].slice(Math.ceil(startTimeM / scale))
    }else if (endTime && !startTime) {
      let endTimeD = parseInt(endTime[0]),
        endTimeH = parseInt(endTime[1]),
        endTimeM = parseInt(endTime[2])
      dayarr = alloptions[0].slice(0, endTimeD)
      harr = alloptions[1].slice(0, endTimeH)
      marr = alloptions[2].slice(0, Math.ceil(endTimeM / scale))
    }else if (endTime && startTime) {
      if (this._compare(startTime, endTime)) {
        let startTimeD = parseInt(startTime[0]),
          startTimeH = parseInt(startTime[1]),
          startTimeM = parseInt(startTime[2]),
          endTimeD = parseInt(endTime[0]),
          endTimeH = parseInt(endTime[1]),
          endTimeM = parseInt(endTime[2])
        // 判断极端情况的开始值
        let lastmin = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2))
        if (lastmin < startTimeM) {
          startTimeH++
          startTimeM = 0
        }
        if (startTimeH > 23) {
          startTimeD++
          startTimeH = 0
        }
        // 分别判断同一天 同一小时的情况
        if (startTimeD != endTimeD) {
          dayarr = alloptions[0].slice(startTimeD, endTimeD)
          harr = alloptions[1].slice(startTimeH)
          marr = alloptions[2].slice(Math.ceil(startTimeM / scale))
        }else if (startTimeH != endTimeH) {
          dayarr = [alloptions[0][startTimeD]]
          harr = alloptions[1].slice(startTimeH, endTimeH)
          marr = alloptions[2].slice(Math.ceil(startTimeM / scale))
        }else {
          dayarr = [alloptions[0][startTimeD]]
          harr = [alloptions[1][startTimeH]]
          marr = alloptions[2].slice(Math.ceil(startTimeM / scale), Math.ceil(endTimeM / scale) + 1)
        }
      }
    }else {
      dayarr = alloptions[0]
      harr = alloptions[1]
      marr = alloptions[2]
    }

    if (dayarr.length > 0) {
      options = [dayarr, harr, marr]
    }else {
      options = [harr, marr]
    }

    if (value) {
      valuearr = value.splice(':')
    }else {
      valuearr = [options[0][0], options[1][0], options[2][0]]
    }

    this.setState({
      value: valuearr,
      alloptions: alloptions,
      options: options,
      starttime: startTime,
      endtime: endTime,
      scale: scale,
      day: day,
      open: open,
      pickerAway: this.props.pickerAway
    })
  }
}

module.exports = PickerTime
