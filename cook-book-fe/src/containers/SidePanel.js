import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

class SidePanel extends Component {

    state = {
        infoArray: []
    }


    fetchInfo = () => {
        if(this.props.infoType === "random"){
            fetch(`http://localhost:3000/recipes`)
            .then(resp => resp.json())
            .then(recipes => this.setState({infoArray: recipes}))

               
        } else if(this.props.infoType === "cookbook"){
            fetch(`http://localhost:3000/cookbooks`)
            .then(resp => resp.json())
            .then(cookbooks => this.setState({infoArray: cookbooks}))
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
        if(this.props.infoType === "random"){

          return  this.state.infoArray.map(recipe => { return {header: recipe.description, description: recipe.user.username , meta: recipe.total_time} })

        } else if(this.props.infoType.includes("cookbook")){

          return  this.state.infoArray.map(cookbook => { return {header: cookbook.title, description: cookbook.description , meta: cookbook.image} })
          
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