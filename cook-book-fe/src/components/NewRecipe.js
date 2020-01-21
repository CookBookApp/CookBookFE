import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'

class NewRecipe extends Component {

    state = {
        name:'',
        keywords:[],
        image:'',
        steps:[],
        stepInputs:['step-0']
    }

    handleClick = (keyword, index) => {
        console.log(keyword)
        if (!this.state.keywords.includes(keyword) && this.state.keywords.length < 5)
            this.setState({
                keywords:[...this.state.keywords,keyword].sort()
            })
        else {
            let newKeywords = this.state.keywords.filter(keyw => keyw != keyword)
            this.setState({
                keywords:newKeywords
            })
        }
    }

    recipeNameChange = (event) => {
        this.setState({
            name:event.target.value
        }, () => {console.log(this.state)})
    }

    addKeywordButtons = () => {
        return ['Beef',
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
                'Veggies'].map((keyword,index)=> {
                return  <Button key={index} size="mini" onClick={() => this.handleClick(keyword,index)} >{keyword}</Button>
        })
    }

    addStepInput = () => {

    }

    render() {
        return (
            <div className='content-feed'>
                <h1>New Recipe</h1>
                <Segment textAlign="left">
                    <Form.Field onChange={this.recipeNameChange}>
                        <label>Recipe Name</label>
                        <br/>
                        <input placeholder="Recipe Name" />
                    </Form.Field>
                </Segment>
                <Segment>
                    {this.state.keywords.join(" / ")}
                </Segment>
                <Segment>
                    Keywords (Max. 5)
                    <br/>
                    {this.addKeywordButtons()}
                </Segment>

            </div>
        );
    }
}

export default NewRecipe;
