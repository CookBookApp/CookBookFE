import React, { Component } from 'react';
import Nav from './containers/Nav';
import Content from './containers/Content'
import SidePanel from './containers/SidePanel'
import Search from './containers/Search'
import './App.css';



class App extends Component {

  state = {
    recipes:[]
  }

  componentDidMount () {
    fetch('http://localhost:3000/recipes')
    .then(r => r.json())
    .then(recipes => this.setState({
      recipes:recipes
    },console.log(recipes)) )
  }

  render() {
    return (
      <div className="App">
        <Search />
        <div className="app-bottom-container">
        <Nav />
        <Content recipes={this.state.recipes}/>
        <SidePanel />
        </div>
      </div>
    );
  }
}

export default App

