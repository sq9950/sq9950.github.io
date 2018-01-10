/**
 * Created by yanshenshen on 17/11/16.
*/
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {
  static propTypes = {
    back: PropTypes.func,
    disabled: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    label: PropTypes.string,
  }
  static defaultProps = {
    back() {},
    disabled: false,
    defaultChecked: false,
    label: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      defaultChecked: this.props.defaultChecked,
    };
    this.clicktaggle = this.clicktaggle.bind(this);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultChecked !== this.props.defaultChecked) {
      this.setState({
        defaultChecked: nextProps.defaultChecked,
      });
    }
  }

  clicktaggle() {
    if (this.props.disabled) {
      return;
    }

    if (this.props.defaultChecked) {
      return;
    }

    this.setState({
      defaultChecked: !this.state.defaultChecked,
    });
    this.props.back && this.props.back(!this.state.defaultChecked);
  }

  render() {
    const {
        className, label, disabled, ...other
      } = this.props,
      { defaultChecked } = this.state;
    const cls = classNames({
      'jimu-form-radio': true,
      'jimu-radio-checked': defaultChecked,
      'jimu-radio-disabled': disabled,
      [className]: className,
    });

    return (
      <div className={cls} onClick={this.clicktaggle}>
        {!defaultChecked && <span className="icon-jimu-radio-normal" />}
        {defaultChecked && <span className="icon-jimu-radio" />}
        <input type="radio" {...other} className="none" />
        <label>{label}</label>
      </div>
    );
  }
}
export default Checkbox;
