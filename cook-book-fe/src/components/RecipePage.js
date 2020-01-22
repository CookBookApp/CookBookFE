import React, { Component } from 'react';
import { Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class RecipePage extends Component {

    state = {
        recipe:{},
        user:{}
    }
    componentDidMount() {
        console.log(this.props.recipe)
        if (this.props.recipe === null || this.props.user === null) {
            this.getRecipe()
        } else {
            this.setState({
                recipe:this.props.recipe,
                user:this.props.user
            })
        }
    }
    getRecipe =  () => {
       let slug = window.location.pathname.slice(8)
       fetch(`http://localhost:3000/recipes/` + slug)
       .then(r => r.json())
       .then(recipe => this.setState({
           recipe:recipe,
           user:recipe.user
       }, () => console.log(this.state)))
    }
    
    render() {
        return (
            <div className="content-feed">
                <Image src={this.state.recipe.image} alt="" size='large' circular/>
                <h3 onClick={() => this.state.goToProfile(this.state.user)}><Image src={this.state.user.image} size='small' circular /> By <Link to={`/profile/${this.state.user.id}`}>{ this.state.user.name }</Link></h3>
            </div>
        );
    }
}

export default RecipePage;