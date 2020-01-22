import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'


class CookbookCard extends Component {
    render() {
        return (
            <div>
                <Card className='nah' >
                <Image src={ this.props.cookbook.image } wrapped ui={false} />
                <Card.Content>
                    {/* <Link to={`/recipe/${this.props.recipe.id}`} onClick={() => this.props.goToRecipe(this.props.recipe,this.props.recipe.user)}> */}
                        <Card.Header> { this.props.cookbook.title } </Card.Header>
                        <Card.Meta>
                            <span className='date'>By</span>
                        </Card.Meta>
                    {/* </Link> */}
                    {/* <Link to={`/profile/${this.props.user.id}`} onClick={() => this.props.goToProfile(this.props.recipe.user, this.props.recipe)}> */}
                        <Card.Description>
                            <Image src={this.props.user.image} size="mini" circular /> {this.props.user.username}
                        </Card.Description>
                    {/* </Link> */}
                    </Card.Content>
                 </Card>
            </div>
        );
    }
}

export default CookbookCard;