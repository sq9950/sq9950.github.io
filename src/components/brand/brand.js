import React, { Component } from 'react';

/*
<Brand
  cityArr={cityArr}  // 城市数组
  dataAttrName={   // 城市对象的默认属性为// city_id、city_name、first_char,如果对象不是这三个属性名，请把属性名传进去
    {
      id:'city_id',
      name:'city_name',
      firstChar:'first_char'
    }
  }
  callBack={this.selectCallBack.bind(this)}  选择完以后，回调函数
/>
*/

class Brand extends Component {
  constructor(props) {
    super(props);
    let i = 0;
    const firstChar = [];
    // 把26个字母放进数组里
    while (i < 26) {
      firstChar.push(String.fromCharCode(i + 97).toLocaleUpperCase());
      i++;
    }

    this.fast_charTouchMove = this.fast_charTouchMove.bind(this);
    this.fast_charTouchEnd = this.fast_charTouchEnd.bind(this);
    this.fast_charClick = this.fast_charClick.bind(this);
    this.carClick = this.carClick.bind(this);
    this.hotCarBrandClick = this.hotCarBrandClick.bind(this);
    this.initMaxChar = this.initMaxChar.bind(this);
    this.initHotCarBrandCon = this.initHotCarBrandCon.bind(this);
    this.initCarBrandCon = this.initCarBrandCon.bind(this);
    this.init_fast_char = this.init_fast_char.bind(this);

    this.state = {
      selectBrand: null,
      max_char: 'A',
      showMaxChar: false,
      firstChar,
    };
  }
  componentWillMount() {
    let {
      carArr,
      dataAttrName,
    } = this.props;
    if (carArr) {
      // 如果是对象的话，需要转换一下
      if (!carArr.length) {
        const carObj = carArr;
        carArr = [];
        this.state.firstChar.map((char) => {
          if (carObj[char]) {
            carObj[char].map((ele) => {
              ele[dataAttrName.firstChar] = char;
              carArr.push(ele);
            });
          }
        });
      }
      const Obj = {};
      /* 把城市分成数组，字母相同的在一组 */
      carArr.map((ele, i) => {
        const firstChar = ele[dataAttrName.firstChar];
        if (!Obj[firstChar]) {
          Obj[firstChar] = [];
        }
        Obj[firstChar].push(carArr[i]);
      });
      this.setState({ carObj: Obj });
    }
  }
  /* 初始化右侧字母栏 */
  init_fast_char() {
    const self = this;
    const {
      fast_charTouchMove,
      fast_charTouchEnd,
      fast_charClick,
      state,
    } = this;
    const {
      carObj,
      firstChar,
    } = state;

    return (
      <div
        className="fast_char"
        onTouchMove={fast_charTouchMove}
        onTouchEnd={fast_charTouchEnd}
      >
        {firstChar.map((char, i) => {
          if (carObj[char]) {
            return (<a
              href="javascript:;"
              data-char={char}
              key={i}
              onClick={fast_charClick}
            >{char}
            </a>
            );
          }
          return null;
        })}
      </div>
    );
  }
  /* 解决锚点会产生历史记录，点后退，退不出当前页面的问题 */
  fast_charClick(e) {
    const fastCharEle = e.currentTarget;
    const ele = document.querySelector(`#first_char_${fastCharEle.dataset.char}`);
    const _carBrandCon = document.querySelector('._carBrandCon');
    _carBrandCon.scrollTop = ele.offsetTop;
  }
  /* 城市点击事件 */
  carClick(e) {
    const {
      callBack,
    } = this.props;
    const carObj = JSON.parse(e.currentTarget.dataset.carobj);
    this.setState({
      selectBrand: carObj,
    });
    callBack && callBack(carObj);
  }
  fast_charTouchMove(e) {
    const { clientX, clientY } = e.targetTouches[0];
    const ele = document.elementFromPoint(clientX, clientY) || {};
    const dataset = ele.dataset;

    if (ele && dataset.char) {
      this.setState({
        maxChar: dataset.char,
        showMaxChar: true,
      });
      ele.click();
    }
    e.preventDefault();
  }
  fast_charTouchEnd() {
    this.setState({
      showMaxChar: false,
    });
  }
  initCarBrandCon() {
    const self = this;
    const {
      carObj,
      selectBrand,
    } = this.state;
    const {
      dataAttrName,
    } = this.props;
    if (!carObj) {
      return null;
    }
    return (
      <ul className="carBrandCon">
        {
          (function () {
            const arr = [];
            for (const a in carObj) {
              arr.push(<li key={a} id={`first_char_${a}`}>
                <a
                  className="first_char"
                  href="javascript:;"
                >
                  {a}
                </a>
                {
                    carObj[a].map((ele, index) => {
                      let isCheck = false;
                      if ((selectBrand && selectBrand.id) && selectBrand[dataAttrName.id] === ele[dataAttrName.id]) {
                        isCheck = true;
                      }
                      { /* div不用label是因为label click 会触发两次 */ }
                      return (
                        <div
                          className={`list${isCheck ? ' select' : ''}`}
                          key={index}
                          id={`car_${ele[dataAttrName.id]}`}
                          data-carobj={JSON.stringify(ele)}
                          onClick={self.carClick}
                        >
                          <img src={`${self.props.staticImgURL}${ele.id}.png`} />
                          <span
                            className="carBrandName"
                          >
                            {ele[dataAttrName.name]}
                          </span>
                        </div>
                      );
                    })
                  }
              </li>);
            }
            return arr;
          }())
        }
      </ul>
    );
  }
  /* 点击定位城市的事件 */
  hotCarBrandClick(e) {
    document.getElementById(`car_${e.currentTarget.dataset.carid}`).click();
  }
  initHotCarBrandCon() {
    const {
      dataAttrName,
      // brandStaticURL,
      staticImgURL,
      hotCarBrandData,
    } = this.props;
    const {
      selectBrand,
    } = this.state;
    if (!hotCarBrandData) {
      return null;
    }
    return (
      <div>
        <div className="selectTitle">热门车型</div>
        <ul
          className="hotCarBrandCon clearfix"
        >
          {
            hotCarBrandData.map((ele, index) => {
              let isCheck = false;
              if ((selectBrand && selectBrand.id) &&
              selectBrand[dataAttrName.id] === ele[dataAttrName.id]) {
                isCheck = true;
              }
              return (
                <li
                  key={index}
                  className={`hotCarBrandList ${isCheck ? 'select' : null}`}
                  data-carid={ele.id}
                  onClick={this.hotCarBrandClick}
                >
                  <img src={`${staticImgURL}${ele.id}.png`} />
                  <span className="hotCarBrandName block">{ele[dataAttrName.name]}</span>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
  initMaxChar() {
    const {
      maxChar,
      showMaxChar,
    } = this.state;
    if (!showMaxChar) {
      return null;
    }
    return <div className="max_char">{maxChar}</div>;
  }
  render() {
    const {
      carArr,
      dataAttrName,
      callBack,
      show,
      hotCarBrandData,
      ...other
    } = this.props;
    if (!show) {
      return null;
    }
    return (
      <div className="catBrandWrap">
        {/* <div className="selectTitle">请选择城市</div> */}
        {/* 滑动右侧字母时，中间显示的大字母 */}
        {this.initMaxChar()}

        {/* 城市列表 */}
        <div className="_carBrandCon" {...other} >
          {hotCarBrandData ? this.initHotCarBrandCon() : null}
          {this.initCarBrandCon()}
        </div>
        {/* 初始化右侧首字母 */}
        {this.init_fast_char()}
      </div>
    );
  }
}
Brand.defaultProps = {
  dataAttrName: {
    id: 'id',
    name: 'name',
    firstChar: 'first_char',
  },
};
module.exports = Brand;
