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
      return (
         <div className="monthNames col-sm-2" onClick={this.props.onClick}>
            {this.props.month}
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
          endMonth: 0
      }
      this.onClick = this.onClick.bind(this)
   }

  onClick(year, month) {
    console.log(year, month)
    this.setState({startYear: year, startMonth: month});
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
            {
              months.map((month, i) => 
                <Content key = {i} month = {month} onClick={()=>this.onClick(year, month)}/>
              )
            }
            <div className="clear"></div>
          </div>)
        })
      }
      </div>
    );
  }
}

export default App;

