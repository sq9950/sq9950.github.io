import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TabPane extends React.Component {
  static propTypes = {
    tab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).isRequired,
  }

  render() {
    const { className, children, ...others } = this.props,
      cls = classNames({
        'jimu-tab-item': true,
        [className]: className,
      });
    return (
      <div className={cls} {...others}>
        {children}
      </div>
    );
  }
}
export default TabPane;
