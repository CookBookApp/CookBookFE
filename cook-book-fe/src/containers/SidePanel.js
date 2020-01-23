import React, { Component } from 'react';
import { Card, Segment, Button } from 'semantic-ui-react'

class SidePanel extends Component {

    state = {
        infoArray: [],
        keywords:[]
    }

    formKeywords = ['Beef',
            'Chicken',
            'Dessert',
            'Gluten-Free',
            'Halal',
            'High-Protein',
            'Kosher',
            'Low-Carb',
            'Pasta',
            'Quick',
            'Seafood',
            'Soup/Stew',
            'Spicy',
            'Vegan',
            'Veggies']

    addKeywordButtons = (sliceStart,sliceEnd) => {
        return this.formKeywords.slice(sliceStart,sliceEnd).map((keyword)=> {
            return  <Button size="mini" onClick={() => this.handleClick(keyword)} >{keyword}</Button>
    })
    }

    handleClick = (keyword) => {
        if (!this.state.keywords.includes(keyword) && this.state.keywords.length < 5)
            this.setState({
                keywords:[...this.state.keywords,keyword].sort()
            }, () => this.props.keywordSearch(this.state.keywords))
        else {
            let newKeywords = this.state.keywords.filter(keyw => keyw !== keyword)
            this.setState({
                keywords:newKeywords
            }, () => this.props.keywordSearch(this.state.keywords))
        }
    }

    fetchInfo = () => {
        if(this.props.infoType === "random"){
            fetch(`http://localhost:3000/recipes`, {
                headers: {
                    'Authorization':`Bearer ${localStorage.token}`
                }})
            .then(resp => resp.json())
            .then(recipes => this.setState({infoArray: recipes}))

               
        } else if(this.props.infoType === "cookbook"){
            fetch(`http://localhost:3000/cookbooks`, {
                headers: {
                    'Authorization':`Bearer ${localStorage.token}`
                }})
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

          return  this.state.infoArray.map(cookbook => { return {header: cookbook.title, description: cookbook.description , meta: ""} })
          

        }
    }
    

    
    render() {
        if (this.props.infoType === 'keyword') {
           return (
            <div className='side-panel'>
                <Segment>
                    <h3>Keywords</h3>
                    <strong>{this.state.keywords.join(" / ")}</strong>
                </Segment>
                <Segment>
                    <h4>Keywords (Max. 5)</h4>
                    <Button.Group compact>
                        {this.addKeywordButtons(0,3)}<br/>
                    </Button.Group>
                    <Button.Group compact>
                        {this.addKeywordButtons(3,6)}<br/>
                    </Button.Group>
                    <Button.Group compact>
                        {this.addKeywordButtons(6,9)}<br/>
                    </Button.Group>
                    <Button.Group compact>
                        {this.addKeywordButtons(9,12)}<br/>
                    </Button.Group>
                    <Button.Group compact>
                        {this.addKeywordButtons(12,15)}<br/>
                    </Button.Group>
                </Segment>  
        </div>
           ) 
        } else {
            return (
                <div className='side-panel'>
                    <Segment>
                        {this.renderName()}
                        <Card.Group textAlign='left' centered={true} itemsPerRow={1} items={this.renderInfo()}  ></Card.Group> 
                    </Segment>  
                </div>
            );
        }
    }
}

export default SidePanel;