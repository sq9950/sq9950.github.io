/**
 * Created by yanshenshen on 17/05/05.
*/

import React from 'react';
import classNames from 'classnames';

const ItemContent = (props) => {
  const {
      className, href, children, ...others
    } = props,
    cls = classNames({
      'jimu-item-content': true,
      [className]: className,
    }),
    Component = href ? 'a' : 'div';
  return (
    <Component className={cls} {...others}>
      {children}
    </Component>
  );
};

export default ItemContent;
