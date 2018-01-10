import React, {
  Component
} from 'react'
import ReactDOM from 'react-dom';
import Picker from './picker.js'

class PickerPackage extends Component {
  constructor(){
    super();
    this.getCarSeries.bind(this)
  }
  onChange(value, text, listIndex){
    let options=this.state.options.slice(0);
    let stateValueArray=this.state.stateValueArray.slice(0);


    if(typeof options[0][0]==="string"){
      stateValueArray[0]=value
      this.setState({
        stateValueArray:stateValueArray
      })
    }else{
      let valueArray=this.state.valueArray.slice(0);
      let series=this.getCarSeries(value);
      var i=0;
      //先把当前项重置，因为这要传到回调里
      stateValueArray[listIndex]=value;
      valueArray[listIndex]={
        value:value,
        text:text
      }
      while(series){
        if(series[0].series){
          //重置下一项的系列
          options[listIndex+i+1]=series
          //下一项的系列重置了，每一项的默认值也要重置
          stateValueArray[listIndex+i+1]=series[0].value
          valueArray[listIndex+i+1]={
            value:series[0].value,
            text:series[0].text
          }
          //循环重置值
          series=series[0].series
          i++
        }else{
          //如果直接是最后一项了，则只重置最后一项
          options[listIndex+i+1]=series
          stateValueArray[listIndex+i+1]=series[0].value
          valueArray[listIndex+i+1]={
            value:series[0].value,
            text:series[0].text
          }
          series=null;
        }
      }
      //set 更新状态
      this.setState({
        options:options,
        stateValueArray:stateValueArray,
        valueArray:valueArray
      })
    }
  }
  //获取到某一个ID下的Series，并返回
  getCarSeries(value){
    let cont = this.props.options
    var obj=[]
    function getseries(arr){
      for(let i=0;i<arr.length;i++){
        if(arr[i].value===value){
          obj=arr[i].series;
        }else{
          if(arr[i].series){
            getseries(arr[i].series);
          }
        }
      }
    };
    getseries(cont);
    return obj;
  }
  //获取到某一个ID下的Series，并返回
  getOptions(value){
    let cont = this.props.options
    var data=null;
    function getseries(arr){
      for(let i=0;i<arr.length;i++){
        if(arr[i].value===value){
          data=arr[i];
        }else{
          if(arr[i].series){
            getseries(arr[i].series);
          }
        }
      }
    };
    getseries(cont);
    return data;
  }
  //获取到某一个ID下的Series，并返回
  getValText(value){
    let cont = this.props.options
    let str=null;
    function getseries(arr){
      for(let i=0;i<arr.length;i++){
        if(arr[i].value==value){
          str=arr[i].text;
        }else{
          if(arr[i].series){
            getseries(arr[i].series);
          }
        }
      }
    };
    getseries(cont);
    return str;
  }
  onClickAway(value, text, listIndex){
    //如明有值，说明滑动过
    if(value){
      //先把原来的数组复制一份
      let arr = this.state.stateValueArray.slice(0);
      //索引校正
      let index=listIndex||0;
      //赋值
      arr[index]=value;
      //如果是只有一项的话
      if(typeof this.props.options[0][0]==="string"){
        this.setState({
          stateValueArray:arr,
          value:[value]
        })
      }
    }
    if(typeof this.props.options[0][0]==="string"){
      this.props.pickerAway&&this.props.pickerAway(this.state.stateValueArray)
    }else{
      this.props.pickerAway&&this.props.pickerAway(this.state.valueArray)
    }
  }
  render(){
    const self=this;
    //初始化值
    if(!this.state){
      let {
        options,
        value
      }=this.props
      let len,
          stateValueArray,//存着每一级id值
          seriesArray,//options里每一级的系列值
          valueArray//value的值
      //如果数组第一项是字符串，说明是单列，则初始化把每一级的每一项放到stateValueArray数组里。并初始化serieArray;
      if(typeof options[0]==="string"){
        stateValueArray=[options[0]]
        seriesArray=[options]
      }else{
        //如果是对象，则递归第一个对象，和第一个对象下series下的第一个对象，组成默认值
        len=options.length
        stateValueArray=[];
        valueArray=[];
        seriesArray=[];
        var series=options;
        if(value){
          valueArray=[
            this.getOptions(value[0]),
            this.getOptions(value[1]),
            this.getOptions(value[2])
          ];
          seriesArray=[
            this.props.options,
            this.getCarSeries(value[0]),
            this.getCarSeries(value[1])
          ];
          stateValueArray=value;
        }else{
          while(series){
            seriesArray.push(series);
            stateValueArray.push(series[0].value);
            valueArray.push(series[0])
            //如果还有下一项，则继续递归
            if(series[0].series){
              series=series[0].series;
            }else{
              //如果没有跳出循环
              series=null;
              break;
            }
          }
        }
      }
      this.state={
        stateValueArray:stateValueArray,
        valueArray:valueArray,
        value:stateValueArray,
        options:seriesArray,
        pickerAway:this.props.pickerAway
      }
    }
    return <Picker
      ref = "picker"
      value={this.state.value}
      options={this.state.options}
      onChange={this.onChange.bind(this)}
      onClickAway={this.onClickAway.bind(this)}
     />
  }
}

module.exports =PickerPackage
