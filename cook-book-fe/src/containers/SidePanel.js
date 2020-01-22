import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

class SidePanel extends Component {

    renderName = () => {
        if(this.props.infoType === "random"){
          return  <h1>Recipes</h1>
        } else {
          return  <h1>Cook Books</h1>
        }
    }


    renderRecipeInfo = () => {
        return  this.props.recipes.map(recipe => { return {header: recipe.description, description: recipe.user.username, meta: recipe.total_time} })
    }

    renderCookBookInfo = () => {
        return  this.props.cookbooks.map(cookbook => { return {header: cookbook.title, description: cookbook.description, meta: cookbook.image} })
    }
    


    render() {
        return (
            <div className='side-panel'>
            {this.renderName()}
            <Card.Group textAlign='left' centered={true} itemsPerRow={1} items={this.props.infoType === "random" ? this.renderRecipeInfo() : this.renderCookBookInfo()}>
                
            </Card.Group>
            </div>
        );
    }
}

export default SidePanel;