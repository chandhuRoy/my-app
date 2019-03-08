import React, { Component } from 'react';
import { connect } from "react-redux";
import { addArticle } from "./js/actions/index";
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      num: 0,
    }
  
  }
  clickHandler(){
    const array = Math.floor((Math.random() * 10) + 1);
    // this.setState({num:1})
    this.props.addArticle(array);
  }
  render() {
    console.log(this.props)
    return (
      <div className="App">
            <ul className='appNav-list'>
              <li className='appNav-listItem'><Link className='appBtn' to='food' >Food</Link></li>
              <li className='appNav-listItem'><Link className='appBtn' to='fashion' >Fashion</Link></li>
            </ul>
        <button onClick={()=>this.clickHandler()}>Click</button>
        {this.props.articles}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
};
const mapStateToProps = state => {
  return { articles: state.articles };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

