import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Picker from '../picker/picker.js'
class CarNumberPicker extends Component {
  constructor () {
    super()
  }
  componentWillMount () {
    // 设置默认显示参数
    let {open, options, value} = this.props
    this.setState({
      open,
      options,
    value})
  }

  static propTypes = {
    open: PropTypes.bool,
    pickerAway: PropTypes.func
  }

  static defaultProps = {
    textvalue: '车牌 picker',
    pickerAway() {},
    open: false,
    options: [['京', '津', '沪', '渝', '冀', '豫', '云', '辽', '黑', '湘', '皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘', '晋', '蒙', '陕', '吉', '闽', '贵', '粤', '青', '藏', '川', '宁', '琼'], ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']],
    value: ['京', 'A'], // 默认数值
  }

  onClickAway () {
    this.props.pickerAway && this.props.pickerAway(this.state.value, this.refs.pickertime)
  }

  onChange (val, text, idx) {
    let {value} = this.state
    value[idx] = val
    this.setState({
    value})
  }

  componentWillReceiveProps (nextprops) {
    if (nextprops.value !== this.props.value) {
      this.setState({
        value: nextprops.value
      })
    }
  }

  render () {
    const {textvalue} = this.props,{value, options, open} = this.state

    return (
      <div className='dataPicker'>
        <div className='pickertime' onClick={this._onClick.bind(this)} ref='pickertime'>
          {textvalue}
        </div>
        <Picker
          ref='car_picker'
          value={value}
          options={options}
          onChange={this.onChange.bind(this)}
          onClickAway={this.onClickAway.bind(this)}
          open={open} />
      </div>
    )
  }

  _onClick () {
    this.refs.car_picker.show()
  }

  show () {
    this.refs.car_picker.show()
  }

}

module.exports = CarNumberPicker
