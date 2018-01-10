import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Align from '../align';
import classNames from 'classnames';

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHide: false,
      points: ['', ''],
    };
    this.closeTip = this.closeTip.bind(this);
    this.renderTipContent = this.renderTipContent.bind(this);
    this.getTarget = this.getTarget.bind(this);
  }
  componentWillMount() {
    const { placement, isShow } = this.props;
    this.handleShowTip(isShow);
    if (placement === 'top') {
      this.setState({
        triangleStyle: 'tb-background-bottom',
        points: ['bc', 'tc'],
        offset: [0, -5],
      });
    } else if (placement === 'bottom') {
      this.setState({
        triangleStyle: 'tb-background-top',
        points: ['tc', 'bc'],
        offset: [0, 5],
      });
    } else if (placement === 'left') {
      this.setState({
        triangleStyle: 'tb-background-right',
        points: ['cr', 'cl'],
        offset: [-5, 0],
      });
    } else if (placement === 'right') {
      this.setState({
        triangleStyle: 'tb-background-left',
        points: ['cl', 'cr'],
        offset: [5, 0],
      });
    } else if (placement === 'topLeft') {
      this.setState({
        points: ['br', 'tl'],
        offset: [0, 5],
      });
    }
  }

  componentDidMount() {
    this._layer = document.createElement('div');
    const { idName } = this.props;
    if (idName) {
      document.getElementById(idName).appendChild(this._layer);
    } else {
      document.body.appendChild(this._layer);
    }
    this.renderTipContent();
  }
  componentWillReceiveProps(nextProps) {
    const { isShow } = nextProps;
    this.handleShowTip(isShow);
  }
  componentDidUpdate() {
    this.renderTipContent();
  }
  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this._layer);
  }
  getTarget() {
    return ReactDOM.findDOMNode(this);
  }
  handleShowTip(isShow) {
    if (isShow || typeof (isShow) === 'undefined') {
      this.setState({
        isHide: false,
      });
    } else {
      this.setState({
        isHide: true,
      });
    }
  }
  renderTipContent() {
    const { placement } = this.props,
      {
        triangleStyle, isHide, points, offset,
      } = this.state;
    ReactDOM.render(<Align
      target={this.getTarget}
      align={{ points, offset }}
      monitorWindowResize
    >
      <div className={classNames('tooltip-box', isHide ? 'hide' : '', [`jimu-popover-${placement}`] : true)} >
        <span>{this.props.overlay}</span>
        <div className="tip-close" onClick={this.closeTip}>
          <i className="car-icons-shut icon-del" />
        </div>
        <div className={classNames('triangle-border', triangleStyle)} />
      </div>
    </Align>, this._layer);
  }
  closeTip() {
    this.setState({
      isHide: true,
    });
    if (typeof (this.props.setTooltipClose) === 'function') {
      this.props.setTooltipClose();
    }
  }
  render() {
    const { children } = this.props;
    const child = React.Children.only(children);
    return child;
  }
}
export default Tooltip;
