import React, { Component } from 'react';
import RecipeCard from './RecipeCard'
import { Card, Segment } from 'semantic-ui-react'

class Feed extends Component {

    createRecipeCards = () => {
        return this.props.recipes.map(recipe => <RecipeCard goToRecipe={this.props.goToRecipe} goToProfile={this.props.goToProfile} recipe={recipe} />)
    }

    render() {
        return (
            <div className="feed">
                <Segment>
                <Card.Group itemsPerRow={1}>
                    {this.createRecipeCards()}
                </Card.Group>
                </Segment>
                    

            </div>
        );
    }
}

export default Feed;