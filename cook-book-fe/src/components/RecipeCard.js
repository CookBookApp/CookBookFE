import React, { Component } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class RecipeCard extends Component {

    

    render() {
        return (
            <Card >
                <Image size="small" src={ this.props.recipe.image } wrapped ui={false} />
                <Card.Content>
                    <Link to={`/recipe/${this.props.recipe.id}`} onClick={() => this.props.goToRecipe(this.props.recipe,this.props.recipe.user)}>
                        <Card.Header> { this.props.recipe.description } </Card.Header>
                        <Card.Meta>
                            <span className='date'>{ this.props.recipe.total_time}</span>
                        </Card.Meta>
                    </Link>
                    <Link to={`/profile/${this.props.recipe.user.id}`} onClick={() => this.props.goToProfile(this.props.recipe.user, this.props.recipe)}>
                        <Card.Description>
                            <Image src={this.props.recipe.user.image} size="mini" circular /> {this.props.recipe.user.username}
                        </Card.Description>
                    </Link>
                    </Card.Content>
            </Card>






            // <div onClick={ this.handleClick } className="recipe-card">
            //     <img src={ this.props.recipe.image } alt='Oh no' />
            //     <div className="recipe-card-details">
            //         <div className="recipe-card-title">
            //         <h2>{ this.props.recipe.title }</h2>
            //         </div>
            //         <div className="recipe-card-sub-details">
            //             <div className="recipe-card-rating">
            //                 <h3>{ this.props.recipe.user.username }</h3>
            //             </div>
            //             <div className="recipe-card-time">
            //                 <h3>{ this.props.recipe.total_time }</h3>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default RecipeCard;