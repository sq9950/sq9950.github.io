/**
 * Created by yanshenshen on 17/05/05.
*/

import React from 'react';
import classNames from 'classnames';


const ItemHd = (props) => {
  const { className, children, ...others } = props,
    cls = classNames({
      'jimu-item-hd': true,
      [className]: className,
    });
  return (
    <div className={cls} {...others}>
      {children}
    </div>
  );
};

export default ItemHd;
