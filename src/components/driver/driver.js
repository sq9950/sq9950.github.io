/**
 * zhangjingwei 03/20/2017
 */
import React from 'react';
import PropTypes from 'prop-types';

const headpic = require('../../styles/image/img_driver_nor.png');

class Driver extends React.Component {
  static propTypes = {
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
    card: PropTypes.string,
    carType: PropTypes.string,
    carColor: PropTypes.string,
    cntOrder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    company: PropTypes.string,
    phone: PropTypes.string,
    isMaster: PropTypes.bool,
  }

  static defaultProps = {
    isMaster: false,
    star: '',
  }

  /* <span className="fz10">{stars}</span> */
  /* <a className="jimu_driver_tel" href={`tel:`+phone}></a> */
  render() {
    const {
      name, avatarUrl, carType, carColor, cntOrder, card, company, phone,
      isMaster, star, children, ...others
    } = this.props;
    return (
      <div className="jimu_driver" {...others}>
        <div className="jimu_driver_avatar">
          <img src={avatarUrl || headpic} width="50" height="50" alt="司机头像" />
        </div>
        <div className="jimu_driver_info">
          <p className="jimu_driver_info_name fz14">
            {name}
            {star && <b className="jimu_driver_star fz12"><span className="icon-trip_icon_star" />{star}</b>}
            <span className="jimu_driver_orders fz12">{cntOrder}单</span>
          </p>
          <p className="jimu_driver_info_platenumber fz12">
            <span className="jimu-driver-platenumber">{card}</span> <b className="jimu-car-color">{carColor}色</b> <b className="jimu-car-type">{carType}</b>
          </p>
        </div>
        {isMaster && (<div className="jimu_driver_telphone"><a href={`tel:${phone}`}><span className="icon-trip_icon_phone" /></a></div>)}
        {children && (
        <div className="brd">
          {children}
        </div>
         )}
      </div>
    );
  }
}

export default Driver;
