/**
 * Created by yanshenshen on 17/04/10.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button/index';

class Search extends React.Component {
  static propTypes = {
    canceltext: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    onChangeHandle: PropTypes.func,
    onClearHandle: PropTypes.func,
    onSubmitHandle: PropTypes.func,
    onFocusHandle: PropTypes.func,
    onBlurHandle: PropTypes.func,
    onCancelHandle: PropTypes.func,
  }
  static defaultProps = {
    canceltext: '取消',
    placeholder: '按姓名或者电话号码搜索',
    name: 'jimu-search',
    onChangeHandle() {},
    onClearHandle() {},
    onCancelHandle() {},
    onFocusHandle() {},
    onBlurHandle() {},
    onSubmitHandle() {},
  }
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      focus: false,
    };

    this.submitHandle = this.submitHandle.bind(this);
    this.focusHandle = this.focusHandle.bind(this);
    this.blurHandle = this.blurHandle.bind(this);
    this.changeHandle = this.changeHandle.bind(this);
    this.clearHandle = this.clearHandle.bind(this);
    this.cancelHandle = this.cancelHandle.bind(this);
  }
  changeHandle(e) {
    const text = e.target.value;
    if (this.props.onChangeHandle) this.props.onChangeHandle(text, e);
    this.setState({ text });
  }

  cancelHandle(e) {
    this.setState({
      focus: false,
      text: '',
    });
    if (this.props.onCancelHandle) this.props.onCancelHandle(e);
  }

  clearHandle(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ text: '' });
    if (this.props.onClearHandle) this.props.onClearHandle(e);
    this.searchInput.focus();
  }

  blurHandle() {
    if (this.state.text === '') {
      this.setState({ focus: false });
    }

    this.props.onBlurHandle && this.props.onBlurHandle();
  }

  focusHandle() {
    this.setState({ focus: true });
    this.props.onFocusHandle && this.props.onFocusHandle();
  }

  submitHandle(e) {
    if (this.props.onSubmitHandle) {
      e.preventDefault();
      e.stopPropagation();
      this.props.onSubmitHandle(this.state.text, e);
    }
  }

  render() {
    const {
        className, canceltext, onChangeHandle, onClearHandle, onCancelHandle, onSubmitHandle,
        ...others
      } = this.props,
      cls = classNames({
        'jimu-search-bar': true,
        'jimu-focusing': this.state.focus,
        [className]: className,
      });
    return (
      <div className={cls}>
        <div className="jimu-search-form">
          <div className="jimu-search-layout">
            <span className="pos-a icon-search" onClick={this.submitHandle} />
            <input
              ref={(n) => { this.searchInput = n; }}
              type="text"
              className="jimu-search-input"
              onFocus={this.focusHandle}
              onBlur={this.blurHandle}
              onInput={this.changeHandle}
              value={this.state.text}
              {...others}
            />
            <span className="pos-a icon-del" onClick={this.clearHandle} />
          </div>
        </div>
        <Button
          className="cancel-btn"
          disabled
          size="small"
          onClick={this.cancelHandle}
        >
          {canceltext}
        </Button>
      </div>
    );
  }
}

export default Search;
