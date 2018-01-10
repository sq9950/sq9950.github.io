/**
 * zhangjingwei 03/20/2017
 */
import React from 'react';
import ReactDOM, { render } from 'react-dom';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="jimu_card">
        <div {...this.props}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Card;
