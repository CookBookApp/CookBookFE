import React, { Component } from 'react';
import Main from './containers/Main'
import Nav from './containers/Nav';
import Content from './containers/Content'
import SidePanel from './containers/SidePanel'
import Search from './containers/Search'
import Profile from './components/Profile'
import NewRecipe from './components/NewRecipe'
import CookbookPage from './components/CookbookPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';



class App extends Component {

  state = {
    currentUser:{id:3}
  }


  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ Main } />
          <Route exact path="/home" render={(renderProps) => {
                  return( 
                          <div className="App">
                            <Search />
                            <div className="app-bottom-container">
                              <Nav currentUser={ this.state.currentUser } />
                              <Content {...renderProps} currentUser={this.state.currentUser} />
                              <SidePanel />
                            </div>
                          </div>
                  )
          } }  />
          <Route exact path="/profile/:id" render={(renderProps) => {
                  return( 
                          <div className="App">
                            <Search />
                            <div className="app-bottom-container">
                              <Nav currentUser={ this.state.currentUser } />
                              <Profile {...renderProps} currentUser={ this.state.currentUser } />
                              <SidePanel />
                            </div>
                          </div>
                  )
          } }  />
          <Route exact path="/new-recipe" render={(renderProps) => {
                  return( 
                          <div className="App">
                            <Search />
                            <div className="app-bottom-container">
                              <Nav currentUser={ this.state.currentUser } />
                              <NewRecipe {...renderProps} currentUser={ this.state.currentUser } />
                              <SidePanel />
                            </div>
                          </div>
                  )
          } }  />
          <Route exact path="/my-cookbooks" render={(renderProps) => {
                  return( 
                          <div className="App">
                            <Search />
                            <div className="app-bottom-container">
                              <Nav currentUser={ this.state.currentUser } />
                              <CookbookPage {...renderProps} currentUser={ this.state.currentUser } />
                              <SidePanel />
                            </div>
                          </div>
                  )
          } }  />
        </Switch>
      </Router>
    );
  }
}

export default App

