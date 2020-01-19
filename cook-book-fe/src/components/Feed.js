import React, { Component } from 'react';
import RecipeCard from './RecipeCard'

class Feed extends Component {

    createRecipeCards = () => {
        return this.props.recipes.map(recipe => <RecipeCard recipe={recipe} />)
    }

    render() {
        return (
            <div className="feed">
                {this.createRecipeCards()}
            </div>
        );
    }
}

export default Feed;