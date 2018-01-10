import React, { Component } from 'react';

class Drawer extends Component {
  static defaultProps = {
    normalMsg: 'asdasdM',
  }

  render() {
    const { normalMsg, ...others } = this.props;
    return (
      <div className="drawer" {...others}>
        {this.props.children && <div>{this.props.children}</div>}
        <div>
          <p>
            {normalMsg}
          </p>
        </div>
      </div>
    );
  }
}

module.exports = Drawer;
