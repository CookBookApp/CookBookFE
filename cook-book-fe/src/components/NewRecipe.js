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
        if (!this.state.keywords.includes(keyword))
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
                return  <Button key={index} onClick={() => this.handleClick(keyword,index)} size="mini" >{keyword}</Button>
        })
    }

    addStepInput = () => {

    }

    render() {
        return (
            <div className='content-feed'>
                <h1>New Recipe</h1>
                <Segment>
                    {this.state.keywords.join(" / ")}
                </Segment>
                <Segment>
                    Keywords<br/>
                    {this.addKeywordButtons()}
                </Segment>

            </div>
        );
    }
}

export default NewRecipe;
