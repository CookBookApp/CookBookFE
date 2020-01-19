import React, { Component } from 'react';

class RecipeCard extends Component {

    handleClick = () => {
       console.log(this.props.recipe)
    }

    render() {
        return (
            <div onClick={ this.handleClick } className="recipe-card">
                <img src={ this.props.recipe.image } alt='Oh no' />
                <div className="recipe-card-details">
                    <div className="recipe-card-title">
                    <h2>{ this.props.recipe.title }</h2>
                    </div>
                    <div className="recipe-card-sub-details">
                        <div className="recipe-card-rating">
                            <h3>{ this.props.recipe.user.username }</h3>
                        </div>
                        <div className="recipe-card-time">
                            <h3>{ this.props.recipe.total_time }</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipeCard;