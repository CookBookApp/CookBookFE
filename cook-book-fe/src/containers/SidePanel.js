import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

class SidePanel extends Component {

    state = {
        cookBookArray: [],
        recipesArray: [],
        infoArray: []
    }


    fetchInfo = () => {
        if(this.props.infoType === "random"){
            fetch(`http://localhost:3000/recipes`)
            .then(resp => resp.json())
            .then(recipes => this.setState({infoArray: recipes, recipesArray: recipes}))

               
        } else if(this.props.infoType === "cookbook"){
            fetch(`http://localhost:3000/cookbooks`)
            .then(resp => resp.json())
            .then(cookbooks => this.setState({infoArray: cookbooks, cookBookArray: cookbooks}))
        }
    }

    componentDidMount(){
        this.fetchInfo();
    }
    


    renderName = () => {
        if(this.props.infoType === "random"){
          return  <h1>Recipes</h1>
        } else if(this.props.infoType === "cookbook" || this.props.infoType === "random cookbook"){
          return  <h1>Cook Books</h1>
        }
    }
    

    renderInfo = () => {
        if(this.state.infoArray === this.state.recipesArray){

          return  this.state.recipesArray.map(recipe => { return {header: recipe.description, description: recipe.user.username , meta: recipe.total_time} })

        } else if(this.state.infoArray === this.state.cookBookArray){

          return  this.state.cookBookArray.map(cookbook => { return {header: cookbook.title, description: cookbook.description , meta: cookbook.image} })
          

        }
    }
    



    render() {
        console.log(this.state)
        return (
            <div className='side-panel'>
            {this.renderName()}
            <Card.Group textAlign='left' centered={true} itemsPerRow={1} items={this.renderInfo()}  ></Card.Group>
            </div>
        );
    }
}

export default SidePanel;