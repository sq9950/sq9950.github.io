import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import Picker from '../picker/picker.js';


class Pickers extends Component {
  static propTypes = {
    value: PropTypes.array,
    options: PropTypes.array,
  }

  static defaultProps = {}

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onClickAway = this.onClickAway.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
  }

  componentWillMount() {
    // 设置默认显示参数
    this.setState({
      oldValue: this.props.value,
      ...this.props,
    });
  }


  componentWillReceiveProps(nextprops) {
    if (nextprops !== this.props) {
      this.setState({
        oldValue: nextprops.value,
        ...nextprops,
      });
    }
  }

  onClickCancel() {
    this.setState({
      value: this.state.oldValue,
    });
  }

  onChange(val, text, idx) {
    const { value } = this.state;
    value[idx] = val;
    this.setState({
      value,
    });
    this.props.onChange && this.props.onChange(val, text, idx);
  }

  onClickAway() {
    this.props.pickerAway && this.props.pickerAway(this.state.value);
  }

  show() {
    this.pickers.show();
  }

  render() {
    return (
      <Picker
        ref={(t) => { this.pickers = t; }}
        value={this.state.value}
        options={this.state.options}
        onChange={this.onChange}
        onClickAway={this.onClickAway}
        onClickCancel={this.onClickCancel}
        open={this.state.open}
        weekText={['', '', '', '', '', '', '']}
      />
    );
  }
}

module.exports = Pickers;
