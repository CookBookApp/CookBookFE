import React, { Component } from 'react';
import Main from './containers/Main'
import Home from './containers/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';



class App extends Component {

  render() {
    return (
      <Router>
        <div>

        </div>
        <Route exact path="/" component={ Main } />
        <Route exact path="/home" component={ Home }  />
      </Router>
    );
  }
}

export default App

