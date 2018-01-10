/**
 * Created by yanshenshen on 17/10/20.
*/
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  activeIndex: PropTypes.number, // 默认索引
};
const defaultProps = {
  activeIndex: 1,
};

const NavBar = (props) => {
  const {
    className, activeIndex, children, ...others
  } = props;
  const cls = classNames({
    'jimu-navbar': true,
    [className]: className,
  });
  return (
    <div {...others} className={cls}>
      {React.Children.map(children, (child, i) => {
           if (!child) { return; }
           const { href } = child.props;
           const Component = href ? 'a' : 'div';
           const itemsCls = classNames({
               'jimu-nav-items': true,
               'jimu-nav-items-selected': i === (activeIndex - 1),
               [className]: className,
             });
           return (
             <Component className={itemsCls} key={i}>
               {child}
             </Component>
           );
         })}
    </div>
  );
};


NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;
export default NavBar;
