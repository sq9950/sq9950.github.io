'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lijincai on 16/11/01.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var propTypes = {
  type: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  focusClass: _propTypes2.default.string
};

var defaultProps = {
  type: 'text',
  disabled: false,
  required: false,
  focusClass: 'jimu-input-focus'
};

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.state = {
      focused: false
    };
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    return _this;
  }

  /* focus样式 */


  _createClass(Input, [{
    key: 'handleFocus',
    value: function handleFocus() {
      this.setState({ focused: true });
    }

    /* blur样式 */

  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      this.setState({ focused: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          value = _props.value,
          className = _props.className,
          focusClass = _props.focusClass,
          blurClass = _props.blurClass,
          maxlength = _props.maxlength,
          props = _objectWithoutProperties(_props, ['value', 'className', 'focusClass', 'blurClass', 'maxlength']);

      var cls = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, focusClass, focusClass && this.state.focused === true), _defineProperty(_classNames, blurClass, blurClass && this.state.focused === false), _defineProperty(_classNames, className, className), _classNames));

      return _react2.default.createElement('input', _extends({
        defaultValue: value,
        className: cls,
        maxLength: maxlength,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }, props));
    }
  }]);

  return Input;
}(_react2.default.Component);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

exports.default = Input;