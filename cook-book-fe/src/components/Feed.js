import React, { Component } from 'react';
import RecipeCard from './RecipeCard'
import { Card } from 'semantic-ui-react'

class Feed extends Component {

    createRecipeCards = () => {
        return this.props.recipes.map(recipe => <RecipeCard recipe={recipe} />)
    }

    render() {
        return (
            <div className="feed">
                <Card.Group itemsPerRow={1}>
                    {this.createRecipeCards()}
                </Card.Group>

            </div>
        );
    }
}

export default Feed;