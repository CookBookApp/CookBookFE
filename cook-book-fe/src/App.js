import React, { Component } from 'react';
import Main from './containers/Main'
import Nav from './containers/Nav';
import Content from './containers/Content'
import SidePanel from './containers/SidePanel'
import Search from './containers/Search'
import Profile from './components/Profile'
import NewRecipe from './components/NewRecipe'
import CookbookPage from './components/CookbookPage'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import RecipePage from './components/RecipePage'
import SearchResults from './containers/SearchResults'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';



class App extends Component {

  state = {
    currentUser:null,
    selectedRecipe:null,
    selectedUser:null,
    searchValue: '',
    searchType: '',
    keywords:null,
    keywordSearchRecipes:null
  }

  handleLogin = (currentUser) => {
    this.setState({
      currentUser
    })
  }


  keywordSearch = (keywords) => {
    console.log(keywords)
    this.setState({
      keywords:keywords
    }, () => this.keywordRecipesFetch())
  }

  keywordRecipesFetch = () => {
    fetch('http://localhost:3000/recipe_keywords', {
      headers: {
          'Authorization':`Bearer ${localStorage.token}`
      }})
    .then(r => r.json())
    .then(keywRecipes => {
      console.log(keywRecipes)
      let newRecipes = []
      this.state.keywords.forEach( keyword => {
        let filteredRecipes = keywRecipes.filter(keywRec => keywRec.keyword.keyword === keyword)
        filteredRecipes = filteredRecipes.map(keywRec => keywRec.recipe)
        Array.prototype.push.apply(newRecipes,filteredRecipes)
      })
      console.log(newRecipes);
      this.setState({
        keywordSearchRecipes:newRecipes
      }, ()=> console.log(this.state.keywordSearchRecipes)
      )
    })
  }
  goToRecipe = (recipe, user) => {
    this.setState({
      selectedRecipe:recipe,
      selectedUser:user
    },() => console.log(this.state.selectedRecipe))
  }


  handleSearch = (searchState) => {

    this.setState({
      searchValue: searchState.searchValue,
      searchType:searchState.searchType
    })
  }

  goToProfile = (user,recipe) => {
    this.setState({
      selectedUser:user,
      selectedRecipe:recipe
    })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Main />}/>
          <Route exact path="/login" render={() =>  <LogIn handleLogin={this.handleLogin}/> }  />
          <Route exact path="/signup" render={() =>  <SignUp handleSignup={this.handleLogin}/>}  />
          <Route exact path="/home" render={(renderProps) => {
                  return( 
                          <div className="App">
                            <Search handleSearch={this.handleSearch} />
                            <div className="app-bottom-container">
                              <Nav currentUser={ this.state.currentUser } />
                              <Content {...renderProps} currentUser={this.state.currentUser} goToProfile={this.goToProfile} goToRecipe={this.goToRecipe}/>
                              <SidePanel infoType="random"/>
                            </div>
                          </div>
                  )
          } }  />
          <Route exact path="/profile/:id" render={(renderProps) => {
                  return( 
                          <div className="App">
                            <Search handleSearch={this.handleSearch}/>
                            <div className="app-bottom-container">
                              <Nav currentUser={ this.state.currentUser } />
                              <Profile {...renderProps} currentUser={ this.state.currentUser } user={this.state.selectedUser} recipe={this.state.recipes} />
                              <SidePanel infoType="cookbook" />
                            </div>
                          </div>
                  )
          } }  />
          <Route exact path="/new-recipe" render={(renderProps) => {
                  return( 
                          <div className="App">
                            <Search handleSearch={this.handleSearch}/>
                            <div className="app-bottom-container">
                              <Nav currentUser={ this.state.currentUser } />
                              <NewRecipe {...renderProps} currentUser={ this.state.currentUser } />
                              <SidePanel infoType="random" />
                            </div>
                          </div>
                  )
          } }  />
          <Route exact path="/my-cookbooks" render={(renderProps) => {
                  return( 
                          <div className="App">
                            <Search handleSearch={this.handleSearch}/>
                            <div className="app-bottom-container">
                              <Nav currentUser={ this.state.currentUser } />
                              <CookbookPage {...renderProps} currentUser={ this.state.currentUser } />
                              <SidePanel infoType="random cookbook" />
                            </div>
                          </div>
                  )
          } }  />
          <Route exact path="/search" render={(renderProps) => {
                  return( 
                          <div className="App">
                            <Search handleSearch={this.handleSearch} />
                            <div className="app-bottom-container">
                              <Nav currentUser={ this.state.currentUser } />
                              <SearchResults {...renderProps} currentUser={ this.state.currentUser } searchValue={this.state.searchValue} searchType={this.state.searchType} />
                              <SidePanel infoType="filter"/>
                            </div>
                          </div>
                  )
          } }  />
          <Route exact path="/recipe/:id" render={(renderProps) => {
                  return( 
                          <div className="App">
                            <Search />
                            <div className="app-bottom-container">
                              <Nav currentUser={ this.state.currentUser } />
                              <RecipePage {...renderProps} currentUser={ this.state.currentUser } user={this.state.selectedUser} recipe={this.state.selectedRecipe} goToProfile={this.goToProfile} />
                              <SidePanel infoType="random"/>
                            </div>
                          </div>
                  )
          } }  />
          <Route exact path="/keyword-search" render={(renderProps) => {
                  return( 
                          <div className="App">
                            <Search />
                            <div className="app-bottom-container">
                              <Nav currentUser={ this.state.currentUser } />
                              <SearchResults {...renderProps} currentUser={ this.state.currentUser } searchValue={this.state.searchValue} searchType='keywords' recipes={this.state.keywordSearchRecipes} />
                              <SidePanel infoType="keyword" keywordSearch={this.keywordSearch}/>
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

