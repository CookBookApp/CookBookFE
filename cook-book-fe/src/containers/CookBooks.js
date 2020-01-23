import React, { Component } from 'react';
import { Card, Segment } from 'semantic-ui-react'
import RecipeCard from '../components/RecipeCard'

class CookBooks extends Component {
    state = {
        cookbook: null
    }

    componentDidMount() {
        this.getRecipes()
    }

    getRecipes = () => {
        let slug = window.location.pathname.slice(10)
        fetch(`http://localhost:3000/users/${slug}`, {
            headers: {
                'Authorization':`Bearer ${localStorage.token}`
            }})
        .then(r => r.json())
        .then(cookbook => this.setState({
            cookbook:cookbook
        },() => console.log(this.state)) )
    }
    createRecipeCards = () => {
        return this.state.cookbook.recipes.map(recipe => <RecipeCard goToRecipe={this.props.goToRecipe} goToProfile={this.props.goToProfile} recipe={recipe} />)
    }

    render() {
        if (this.state.cookbook !== null) {

         
        return (
            <div className="feed">
                <Segment>
                    <Card.Group itemsPerRow={1}>
                        {this.createRecipeCards()}
                    </Card.Group>
                </Segment>
                    

            </div>
        );
        } else {
           return(
            <div>

            </div>
           ) 
        }
    }
}

export default CookBooks;