'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by jf on 15/10/27.
                                                                                                                                                                                                                              */

// class Button extends React.Component {
var Button = function Button(props) {
  var type = props.type,
      size = props.size,
      disabled = props.disabled,
      plain = props.plain,
      className = props.className,
      children = props.children,
      selected = props.selected,
      float = props.float,
      others = _objectWithoutProperties(props, ['type', 'size', 'disabled', 'plain', 'className', 'children', 'selected', 'float']);

  var Component = props.href ? 'a' : 'button';
  var cls = (0, _classnames2.default)(_defineProperty({
    didi_btn: true,
    'jimu-button-type-float': float,
    didi_btn_highlight: type === 'highlight' && !plain,
    didi_btn_highlight_disable: type === 'highlight' && disabled,
    didi_btn_border: size === 'small',
    didi_btn_disable: disabled,
    didi_btn_selected: selected
  }, className, className));

  return _react2.default.createElement(
    Component,
    _extends({}, others, { className: cls }),
    children
  );
};

Button.propTypes = {
  disabled: _propTypes2.default.bool,
  float: _propTypes2.default.bool,
  type: _propTypes2.default.string,
  size: _propTypes2.default.string
};

Button.defaultProps = {
  disabled: false,
  type: 'primary',
  size: 'normal',
  float: false
};

exports.default = Button;