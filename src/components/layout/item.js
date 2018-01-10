/**
 * Created by yanshenshen on 17/05/05.
*/

import React from 'react';
import classNames from 'classnames';

const Item = (props) => {
  const {
      className, children, href, ...others
    } = props,
    cls = classNames({
      'jimu-item': true,
      'jimu-item-href': href,
      [className]: className,
    }),
    Component = href ? 'a' : 'div';
  return (
    <Component className={cls} {...others}>
      {children}
    </Component>
  );
};

export default Item;
