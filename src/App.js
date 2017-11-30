import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Header extends React.Component {
   render() {
      return (
         <div className="yearNames">
            {this.props.year}
         </div>
      );
   }
}

class Content extends React.Component {
   render() {
      var status, diff1, diff2;
      diff1 = ((this.props.year*12 + this.props.monthNum) - (this.props.state.startYear*12 + this.props.state.startMonth));
      diff2 = ((this.props.state.endYear*12 + this.props.state.endMonth) - (this.props.year*12 + this.props.monthNum));
      if (diff1 === 0 || diff2 === 0)
        status = 1;
      else if (diff1 > 0 && diff2 > 0)
        status = 2;
      else
        status = 0;
      return (
         <div className={"monthNames " + (status===2 ? 'selected' : (status===1 ? 'between': ''))} onClick={this.props.onClick}>
            <a>{this.props.month}</a>
         </div>
      );
   }
}
class App extends Component {
  constructor() {
      super();
      this.state = {
          startYear: 0,
          startMonth: 0,
          endYear: 0,
          endMonth: 0,
          selectType: 0
      }
      this.onClick = this.onClick.bind(this)
   }

  onClick(year, month) {
    if (this.state.selectType === 0){
      this.setState({startYear: year, startMonth: month, endYear: year, endMonth: month, selectType: 1});
    }
    else{
      if ((this.state.startYear * 12 + this.state.startMonth) >= (year*12 + month))
        this.setState({startYear: year, startMonth: month, endYear: this.state.startYear, endMonth: this.state.startMonth, selectType: 0});
      else
        this.setState({endYear: year, endMonth: month, selectType: 0});
    }
  }

  render() {
    var years = [], months;
    for(var i=2017;i<2020;i++)
      years.push(i);
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    return (
      <div className="dateComponent">
      {
        years.map((year) => {
          return (<div className="row" key = {year} >
            <Header year = {year}/>
            <div className="monthContainer">  
            {
              months.map((month, i) => 
                <Content key = {i} month = {month} monthNum = {i+1} year = {year} state = {this.state}
                    onClick={()=>this.onClick(year, i+1)} 
                  />
              )
            }
            </div>
            <div className="clear"></div>
          </div>)
        })
      }
      </div>
    );
  }
}

export default App;

