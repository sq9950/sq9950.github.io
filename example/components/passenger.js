import React, { Component } from 'react'
import JIMU from './index'

const {Passenger} = JIMU
// 乘车人 passenger
const _Passenger = () => (
  <div className="example-wrap">
    <div className="example-back"><a href="https://uxdcer.github.io/jimu-mobile/#/?_k=ahtykk"><span className="icon-pic-home"></span></a></div>
    <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 144}px`}}>
      <h2 className="page-title"><b>Passenger</b><span>乘车人</span></h2>
      <div className="demo-show">
        <Passenger
          start_address="数字山谷B区"
          end_address="当代城市家园"
          user_name="13552090147"
          departure_endtime="2017-03-21 21:15:00"
          avatarUrl=""
          isMaster={false}
          isPhone={false}
          isNeed={false}
          user_phone="13552090147"
          company_pay="120.00"
          total_fee="60.00"
          ride_type="4"
        />
      </div>
    </div>
    <div className="footer-name">
      <span className="footer-name-pic"></span>
    </div>
  </div>
)
module.exports = _Passenger
