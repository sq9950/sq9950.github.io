/**
 * Created by yanshenshen on 17/04/10.
 */

import React from 'react';

class TextList extends React.Component {
  render() {
    const { textlist } = this.props;
    return (
      <div className="text-list">
        {textlist}
      </div>
    );
  }
}

class ArrayText extends React.Component {
  static defaultProps = {
    text: '1234',
  }

  constructor(props) {
    super(props);
  }

  isArray(obj) {
    return (typeof obj === 'object') && obj.constructor === Array;
  }

  render() {
    const { text } = this.props;
    return (
      <div className="array-text">
        {!this.isArray(text) ?
           text
           :
           text.map((res, index) => <TextList textlist={res} key={index} />)}
      </div>
    );
  }
}

export default ArrayText;
