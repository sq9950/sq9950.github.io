/**
 * Created by jf on 15/10/27.
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// class Button extends React.Component {
const Button = (props) => {
  const {
    type, size, disabled, plain, className, children, selected, float, ...others
  } = props;

  const Component = props.href ? 'a' : 'button';
  const cls = classNames({
    didi_btn: true,
    'jimu-button-type-float': float,
    didi_btn_highlight: type === 'highlight' && !plain,
    didi_btn_highlight_disable: type === 'highlight' && disabled,
    didi_btn_border: size === 'small',
    didi_btn_disable: disabled,
    didi_btn_selected: selected,
    [className]: className,
  });

  return (
    <Component {...others} className={cls}>
      {children}
    </Component>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  float: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  type: 'primary',
  size: 'normal',
  float: false,
};

export default Button;
