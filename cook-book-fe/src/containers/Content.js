import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Feed from '../components/Feed';
import Profile from '../components/Profile'

class Content extends Component {

    state = {
        recipes:[]
    }
    
    componentDidMount () {
        fetch('http://localhost:3000/recipes')
        .then(r => r.json())
        .then(recipes => this.setState({
          recipes:recipes
        },console.log(this.props)) )
    }


    render() {
        return (
            <div className="content-feed">
                <Switch>
                    <Route path="/" render={ renderProps => <Feed { ...renderProps } goToRecipe={this.props.goToRecipe} goToProfile={this.props.goToProfile} recipes={ this.state.recipes } /> } /> 
                </Switch>
            </div>
        );
    }
}

export default Content;