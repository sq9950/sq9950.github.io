import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ViewPoint from 'es6-viewpoint';
import Swipe from '../swipe/index';

const { Swipeable } = Swipe;

const isBrowser = (typeof window !== 'undefined' && typeof document !== 'undefined');


// const Picker = React.createClass({
class Picker extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    onShow: PropTypes.func,
    onDismiss: PropTypes.func,
    onClickAway: PropTypes.func,
    width: PropTypes.string,
  }

  static defaultProps = {
    onChange(value, text, idx) {},
  }

  constructor(props) {
    super(props);
    this._onScroll = this._onScroll.bind(this);
    this._handleOverlayTouchTap = this._handleOverlayTouchTap.bind(this);
    this._okClick = this._okClick.bind(this);
    this._cancelClick = this._cancelClick.bind(this);
    this.state = {
      value: this.props.value,
      options: this.props.options,
      open: this.props.open,
      optionHeight: 0,
      _scrollStartTop: [],
      _initValueIndexes: [],
      _scrollTimer: undefined,
      closeable: this.props.open,
    };
    this.determine = true;
  }

  componentDidMount() {
    let op = this.refs['op-0-0'],
      opHeight = 0;
    if (op) {
      opHeight = this.state.optionHeight = ReactDOM.findDOMNode(op).clientHeight;
    }
    this.state._initValueIndexes.forEach((vi, idx) => {
      if (vi > 0) {
        const node = this.refs[`list-${idx}`]; // div, ReactDOM.findDOMNode( this.refs['list-'+idx] )
        node.scrollTop = this.state._scrollStartTop[idx] = vi * opHeight;
      }
    });
    // window.addEventListener('scroll', this._onPageScroll)
  }

  componentWillReceiveProps(nextProps) {
    let self = this,
      values = nextProps.value,
      opArr = nextProps.options,
      preValues = this.state.value,
      preOpArr = this.state.options,
      opHeight = this.state.optionHeight;
    if (!Array.isArray(values)) {
      values = [values];
      opArr = [opArr];
      preValues = [preValues];
      preOpArr = [preOpArr];
    }
    values.forEach((v, idx) => {
      if (values[idx] !== preValues[idx] || opArr[idx] !== preOpArr[idx]) {
        let ops = opArr[idx],
          top = 0;
        for (let oi = 0; oi < ops.length; oi++) {
          const opv = (typeof ops[oi] === 'string' || typeof ops[oi] === 'number') ? ops[oi] : ops[oi].value;
          if (String(opv) === String(v)) {
            top = oi * opHeight;
            break;
          }
        }
        const node = this.refs[`list-${idx}`]; // div, ReactDOM.findDOMNode( this.refs['list-'+idx] )

        setTimeout(() => {
          node.scrollTop = self.state._scrollStartTop[idx] = top;
        });
      }
    });
    this.setState({
      value: nextProps.value,
      options: nextProps.options,
    });
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this._onPageScroll);
    this.state._scrollTimer && window.clearTimeout(this.state._scrollTimer);
  }

  value() {
    return this.state.value;
  }

  render() {
    let values = this.state.value,
      __options = this.state.options;
    if (!Array.isArray(values)) {
      values = [values];
      __options = [__options];
    }

    const initValueIndexes = [];
    const style = {
      width: `${100 / __options.length}%`,
    };
    let i = -1; // counter for __options, for it is an array or key-map object
    const lists = __options.map((options) => {
      if (!options) { return; }
      i++;
      let j = -1; // counter for options, for it is an array or key-map object
      return (
        <div
          key={i}
          ref={`list-${i}`}
          data-id={i}
          className="list-wrap"
          style={style}
          onScroll={isBrowser ? this._onScroll : undefined}
        >
          <ul>
            {
              options.map((op) => {
                j++;
                if (typeof op === 'string' || typeof op === 'number') {
                  op = {
                    text: op,
                     value: op,
                  };
                } else if ((typeof op !== 'object') || !op.text) { return; }
                if (typeof op.value !== 'string' && typeof op.value !== 'number') { op.value = ''; }

                if (String(op.value) === String(values[i])) {
                  initValueIndexes.push(j);
                }

                return (
                  <Swipeable
                    key={j}
                    ref={`op-${i}-${j}`}
                    data-id={`${i}-${j}`}
                    data-value={JSON.stringify(op)}
                    nodeName="li"
                  >
                    {op.text}
                  </Swipeable>
                );
              })
            }
          </ul>
        </div>
      );
    });

    this.state._initValueIndexes = initValueIndexes;

    const popupStyle = {};
    if (this.props.width && ViewPoint && ViewPoint.width >= 768) {
      popupStyle.width = this.props.width;
    }
    return (
      <div className={['jimu-picker', this.props.className].join(' ')}>
        {this.props.children}
        <div className={['container', 'table', this.props.className, (this.state.open ? 'show' : undefined)].join(' ')}>
          <Swipeable className="overlay" />
          <div className="cell">
            <div className={['popup', (this.state.open ? 'show' : undefined)].join(' ')} style={popupStyle}>
              <div className="top">
                <span className="cancel" onClick={this._cancelClick}>取消</span>
                <span className="ok" onClick={this._okClick}>确定</span>
                <span className="title">{this.props.titleName}</span>
              </div>
              {lists}
              <div className="cover upper" />
              <div className="cover lower" />
              <div className="cell-bg" />
            </div>

          </div>
        </div>
      </div>
    );
  }
  dismiss() {
    if (this.state.closeable) {
      this._onDismiss();
    }
  }
  show() {
    // prevent rapid show/hide
    this._onShow();
  }
  _cancelClick() {
    this.setState({
      open: false,
      loading: false,
    });
    this.props.onClickCancel && this.props.onClickCancel();
  }
  _okClick() {
    if (this.determine) {
      this._handleOverlayTouchTap(this.state.opValue, this.state.opText, this.state.idx);
    }
  }
  _handleOverlayTouchTap(value, text, idx) {
    if (this.state.closeable) {
      this._onDismiss();
      this.props.onClickAway && this.props.onClickAway(value, text, idx);
    }
  }
  _onShow() {
    setTimeout(() => {
      this.state.closeable = true;
    }, 250);
    this.setState({
      open: true,
    });
    this.props.onShow && this.props.onShow();
  }
  _onDismiss() {
    this.setState({
      open: false,
      loading: false,
    });
    this.props.onDismiss && this.props.onDismiss();
  }
  _onPageScroll(e) {}
  _onScroll(e) {
    let el = e.target,
      idx = parseInt(el.dataset ? el.dataset.id : el.getAttribute('data-id'), 10),
      opHeight = this.state.optionHeight,
      scrollStartTop = this.state._scrollStartTop;

    window.clearTimeout(this.state._scrollTimer);
    this.state._scrollTimer = window.setTimeout(() => {
      if (typeof scrollStartTop[idx] !== 'number') { scrollStartTop[idx] = 0; }

      if (scrollStartTop[idx] === el.scrollTop) { return; }

      let scrollTop = el.scrollTop,
        mod = scrollTop % opHeight,
        percent = mod / opHeight;

      const toLowerItem = () => {
        const diff = opHeight - mod;
        scrollTop += diff;
        el.scrollTop += diff;
      };
      const toUpperItem = () => {
        scrollTop -= mod;
        el.scrollTop -= mod;
      };

      if (scrollTop > scrollStartTop[idx]) {
        percent > 0.46 ? toLowerItem() : toUpperItem();
      } else {
        percent < 0.64 ? toUpperItem() : toLowerItem();
      }
      scrollStartTop[idx] = scrollTop;
      const opname = `op-${idx}-${scrollTop / opHeight}`;
      if (this.refs[opname] && ReactDOM.findDOMNode(this.refs[opname]) && ReactDOM.findDOMNode(this.refs[opname]).getAttribute('data-value')) {
        let op = ReactDOM.findDOMNode(this.refs[opname]).getAttribute('data-value');
        if (!op) { return; }
        op = JSON.parse(op);

        let value = this.state.value;
        if (Array.isArray(value)) {
          value[idx] = op.value;
        } else {
          value = op.value;
        }
        this.setState({
          value,
          opValue: op.value,
          opText: op.text,
          idx,
        });
        this.props.onChange(op.value, op.text, idx);
        this.determine = true;
      } else {
        this.determine = false;
      }
    }, 250);
  }
  _clickOnOption(e) {
    let el = e.target,
      value = el.dataset ? el.dataset.id : el.getAttribute('data-id');
    if (!value) { return; }

    const arr = value.split('-');
    if (arr.length < 2) { return; }

    const _list = this.refs[`list-${arr[0]}`];
    if (!_list) { return; }
    const list = _list; // div, ReactDOM.findDOMNode(_list)
    list.scrollTop = this.state.optionHeight * parseInt(arr[1], 10);
  }
}

export default Picker;
