import React, { Component } from 'react';
import { Image, Segment, List, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class RecipePage extends Component {

    state = {
        recipe:null,
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
       fetch(`http://localhost:3000/recipes/` + slug, {
        headers: {
            'Authorization':`Bearer ${localStorage.token}`
        }})
       .then(r => r.json())
       .then(recipe => this.setState({
           recipe:recipe,
           user:recipe.user
       }, () => console.log(this.state.recipe) ))
    }
    
    renderIngredients = () => {
        console.log(this.state.recipe.ingredients)
       return this.state.recipe.ingredients.map(ingredient => {

            return( 
                    <List.Item>
                         {/* <List.Icon name='github' size='large' verticalAlign='middle' /> */}
                         <List.Content>
                             <List.Description>{ingredient.ingredient}</List.Description>
                         </List.Content>
                     </List.Item> 
            )
         })
    }

    renderSteps = () => {
        console.log(this.state.recipe.steps)
        return this.state.recipe.steps.map(step => {

            return( 
                    <List.Item>
                         {/* <List.Icon name='github' size='large' verticalAlign='middle' /> */}
                         <List.Content>
                             <List.Description>{step.content}</List.Description>
                         </List.Content>
                     </List.Item> 
            )
         })
    }

    render() {
        if (this.state.recipe === null) {
            return (
                <div className="content-feed">
                    <Segment>
                        {/* <Image src={this.state.recipe.image} alt="" size='large' circular/> */}
                        {/* <h3 onClick={() => this.state.goToProfile(this.state.user)}><Image src={this.state.user.image} size='small' circular /> By <Link to={`/profile/${this.state.user.id}`}>{ this.state.user.name }</Link></h3> */}
                    </Segment>
                    <Segment.Group>
                        <Segment>
                            <List divided relaxed>
                        
                            </List>
                        </Segment>
                    </Segment.Group>
                </div>
            );
        } else {
            return (
                <div className="content-feed">
                    <Segment>
                        <Image src={this.state.recipe.image} alt="" size='medium' centered circular/>
                        <div style={{textAlign:'center', display:'flex', margin:'auto'}}><Image  src={this.state.user.image} size='mini' circular />Submitted By <Link to={`/profile/${this.state.user.id}`}><h4>{ this.state.user.username }</h4></Link></div>
                    </Segment>
                        <Segment>
                            <h3>Ingredients</h3>
                            <List divided relaxed>
                                {this.renderIngredients()}
                            </List>
                        </Segment>
                        <Segment>
                            <h3>Steps</h3>
                            <List divided relaxed>
                                {this.renderSteps()}
                            </List>
                        </Segment>
                </div>
            );
        }
    }
}

export default RecipePage;
