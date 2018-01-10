/**
 * Created by yanshenshen on 17/04/10.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import Swipe from '../swipe/index';

const { Swipeable } = Swipe;

class InfiniteLoader extends React.Component {
  static propTypes = {
    direction: PropTypes.string,
    onSwipingBack: PropTypes.func,
    onSwipedBack: PropTypes.func,
    disSwipe: PropTypes.bool,
    swipeSucc: PropTypes.bool,
  }

  static defaultProps = {
    direction: 'top',
    onSwipingBack() {},
    onSwipedBack() {},
    disSwipe: false,
    swipeSucc: false,
    height: '400px',
  }

  constructor(props) {
    super(props);
    this.state = {
      isSwipeIng: true,
      degree: 120,
      isDegree: false,
    };

    this.SwipingUpBack = this.SwipingUpBack.bind(this);
    this.SwipingDownBack = this.SwipingDownBack.bind(this);
    this.SwipedBack = this.SwipedBack.bind(this);
  }

  componentDidMount() {
    this.initSetStyle(this.props);
  }

  componentWillReceiveProps(nextprops) {
    this.initSetStyle(nextprops);
  }

  initSetStyle(props) {
    const { conMain } = this;
    conMain.style.WebkitTransition = 'all 0.2s ease-in';
    // conMain.style.WebkitTransform = 'translate(0,0)';
    conMain.style.top = '0';
    this.setState({
      // isSwipeIng : true,
      swipeSucc: props.swipeSucc,
    });
  }

  // 当滑动的时候执行
  SwipingFun(posY) {
    const { onSwipingBack } = this.props,
      { isSwipeIng, degree } = this.state;

    if (!isSwipeIng) {
      this.setState({
        isSwipeIng: true,
        swipeSucc: false,
      });
    }

    if (Math.abs(posY) > degree) {
      this.setState({
        isDegree: true,
      });
    }

    if (onSwipingBack) {
      onSwipingBack();
    }
  }

  SwipingUpBack(e, posY) {
    const { direction } = this.props,
      { conMain, SwipeNode } = this,
      listNode = ReactDOM.findDOMNode(conMain),
      swipeScrollTop = ReactDOM.findDOMNode(SwipeNode).scrollTop,
      documentH = ReactDOM.findDOMNode(SwipeNode).clientHeight;

    if (direction === 'top' || documentH + swipeScrollTop < listNode.clientHeight) {
      return false;
    }

    e.preventDefault && e.preventDefault();

    conMain.style.WebkitTransition = 'none';
    // conMain.style.WebkitTransform = `translate(0,-${posY / 4}px)`;
    conMain.style.top = `-${posY / 4}px`;

    this.SwipingFun(posY);
  }

  SwipingDownBack(e, posY) {
    const { onSwipingBack, direction } = this.props,
      { conMain, SwipeNode } = this,
      swipeScrollTop = ReactDOM.findDOMNode(SwipeNode).scrollTop;

    if (direction !== 'top' || swipeScrollTop > 0) {
      return false;
    }

    e.preventDefault && e.preventDefault();

    conMain.style.WebkitTransition = 'none';
    // conMain.style.WebkitTransform = `translate(0,${posY / 4}px)`;
    conMain.style.top = `${posY / 4}px`;

    this.SwipingFun(posY);
  }

  SwipedBack(e, posX, posY) {
    const { onSwipedBack, direction, disSwipe } = this.props,
      { conMain, SwipeNode } = this,
      { degree } = this.state,
      listNode = ReactDOM.findDOMNode(conMain),
      swipeScrollTop = ReactDOM.findDOMNode(SwipeNode).scrollTop,
      documentH = ReactDOM.findDOMNode(SwipeNode).clientHeight,
      newposY = Math.abs(posY);

    if (disSwipe || newposY < degree || (direction === 'top' && (swipeScrollTop > 0 || posY > 0))
    ) {
      conMain.style.WebkitTransition = 'all 0.2s ease-in';
      // conMain.style.WebkitTransform = 'translate(0,0)';
      conMain.style.top = '0';
      this.setState({
        isDegree: false,
      });

      return false;
    }
    if (disSwipe || newposY < degree || direction === 'bottom') {
      if (posY < 0 ||
        (documentH + swipeScrollTop < listNode.clientHeight) ||
        (documentH + swipeScrollTop > listNode.clientHeight &&
        listNode.clientHeight - documentH - swipeScrollTop >= 0)
      ) {
        conMain.style.WebkitTransition = 'all 0.2s ease-in';
        // conMain.style.WebkitTransform = 'translate(0,0)';
        conMain.style.top = '0';
        return false;
      }
    }
    conMain.style.WebkitTransition = 'all 0.2s ease-in';
    if (direction === 'top') {
      //conMain.style.WebkitTransform = 'translate(0,35px)';
      conMain.style.top = '35px';
    } else {
      // conMain.style.WebkitTransform = 'translate(0,-35px)';
      conMain.style.top = '-35px';
    }
    this.setState({
      isSwipeIng: false,
      swipeSucc: false,
      isDegree: false,
    });

    if (onSwipedBack) {
      onSwipedBack();
    }
  }

  render() {
    const {
        className, children, direction, disSwipe, height,
      } = this.props,
      { isSwipeIng, swipeSucc, isDegree } = this.state,
      cls = classNames({
        'jimu-swipe-items': true,
        [className]: className,
      }),

      cls2 = classNames({
        'jimu-pos-layout': true,
        'jimu-pos-top': direction === 'top',
        'jimu-pos-bottom': direction === 'bottom',
        [className]: className,
      });
    return (
      <Swipeable
        ref={(t) => { this.SwipeNode = t; }}
        style={{ height }}
        className={cls}
        onSwipingUp={this.SwipingUpBack}
        onSwipingDown={this.SwipingDownBack}
        onSwiped={this.SwipedBack}
      >
        <div className="jimu-swipe-por">
          <div ref={(t) => { this.conMain = t; }} className="jimu-swipe-con">
            {children}
          </div>
          <div className={cls2}>
            {!disSwipe ?
               (isSwipeIng ?
                 (
                  isDegree ? <div className="swipeing">{direction === 'top' ? '松开刷新' : '加载更多'}</div> : <div className="swipeing">{direction === 'top' ? '下拉刷新' : '上拉刷新'}</div>
                 )
                 :
                 (
                   <div className="swiped">
                     {swipeSucc ? '加载成功' : '加载中...'}
                   </div>
                 )
               )
               : (<div className="swipeing">数据已是最新</div>)}
          </div>
        </div>
      </Swipeable>
    );
  }
}

export default InfiniteLoader;
