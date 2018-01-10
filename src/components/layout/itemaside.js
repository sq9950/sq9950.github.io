/**
 * Created by yanshenshen on 17/05/05.
*/

import React from 'react';
import classNames from 'classnames';

const ItemAside = (props) => {
  const {
      className, children, href, ...others
    } = props,
    cls = classNames({
      'jimu-item-aside': true,
      [className]: className,
    }),
    Component = href ? 'a' : 'div';
  return (
    <Component className={cls} {...others}>
      {children}
    </Component>
  );
};

export default ItemAside;
