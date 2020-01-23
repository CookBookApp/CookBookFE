import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import Feed from '../components/Feed';
import Profile from '../components/Profile'

class Content extends Component {

    state = {
        recipes:[]
    }
    
    componentDidMount () {
        if (!localStorage.token){
            this.props.history.push('/')
        }
        fetch('http://localhost:3000/recipes', {
            headers: {
                'Authorization':`Bearer ${localStorage.token}`
            }
        })
        .then(r => r.json())
        .then(recipes => {
            console.log(recipes)
            this.setState({
                recipes:recipes
            },console.log(this.props)) 
        }
        )
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

export default withRouter(Content);