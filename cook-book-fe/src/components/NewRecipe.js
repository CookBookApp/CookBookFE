import React, { Component } from 'react';
import { Button, Form, Segment, Image, Input, Icon } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'

class NewRecipe extends Component {

    state = {
        name:'',
        keywords:[],
        imageSrc:null,
        ingredients:[""],
        ingredientInputs:['ingredient-0'],
        steps:[],
        stepInputs:['step-0']
    }

    handleClick = (keyword) => {
        console.log(keyword)
        if (!this.state.keywords.includes(keyword) && this.state.keywords.length < 5)
            this.setState({
                keywords:[...this.state.keywords,keyword].sort()
            })
        else {
            let newKeywords = this.state.keywords.filter(keyw => keyw !== keyword)
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

    ingredientExamples = ['4 oz. Butter',
                          '1 lb. Ground Beef',
                          '6 Garlic Cloves minced',
                          '2 tbs. Black Pepper',
                          '1 cup Heavy Cream',
                          '1 tsp. Vanilla Extract',
                          '1 qt. Whole Milk']

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

    handleImageUpload = (acceptedFiles,rejectedFiles) => {
        const currentImage = acceptedFiles[0]
        const reader = new FileReader()
        reader.addEventListener("load", ()=>{
            console.log(reader.result)
            this.setState({
                imgSrc:reader.result
            })
        },false)
        reader.readAsDataURL(currentImage)
        console.log(acceptedFiles)
        console.log('rejected',rejectedFiles)
    }

    renderIngredientInputs = () => {
        return this.state.ingredientInputs.map((ingredientInputs,index) => {
            return(
                <div>
                    <Input id={ingredientInputs} onChange={(event) => this.handleChange("ingredient",event)} className="ingredient-input" value={this.state.ingredients[index]} placeholder={`${this.ingredientExamples[Math.floor(Math.random() * this.ingredientExamples.length)]}`} />
                    <Button.Group id="add-button" >
                    <Button  onClick={() => this.addInput("ingredient")} icon>
                        <Icon name="add" />
                    </Button>
                    <Button  onClick={() => this.deleteInput("ingredient", Number(ingredientInputs.slice(11)))} icon>
                        <Icon name="delete" />
                    </Button>

                    </Button.Group>
                </div>
            )
        })  
    }

    deleteInput = (inputType,index) => {
        console.log(index)
        if (inputType === "ingredient") {
            let newIngredients = [...this.state.ingredients],
                newIngredientInputs = [...this.state.ingredientInputs]

                newIngredientInputs.splice(index,1)
                newIngredients.splice(index,1)
            this.setState({
                ingredients:newIngredients,
                ingredientInputs:newIngredientInputs
            }, () => console.log(this.state.ingredients))
        } else {
            let newSteps = [...this.state.steps],
                newStepInputs = [...this.state.stepInputs]

                newStepInputs.splice(index,1)
                newSteps.splice(index,1)
            this.setState({
                steps:newSteps,
                stepInputs:newStepInputs})
        }
    }

    renderStepInputs = () => {
        return this.state.stepInputs.map((stepInput,index) => {
            if (this.state.stepInputs.length <= 1) {
                return(
                    <div>
                        <Input id={stepInput} onChange={(event) => this.handleChange("step",event)} className="ingredient-input" value={this.state.steps[index]} placeholder={`${this.ingredientExamples[Math.floor(Math.random() * this.ingredientExamples.length)]}`} />
                        <Button.Group id="add-button">
                            <Button  onClick={() => this.addInput("step")} icon>
                                <Icon name="add" />
                            </Button>
                        </Button.Group>
                    </div>
                )
            } else {
                return(
                    <div>
                        <Input id={stepInput} onChange={(event) => this.handleChange("step",event)} className="ingredient-input" value={this.state.steps[index]} placeholder={`${this.ingredientExamples[Math.floor(Math.random() * this.ingredientExamples.length)]}`} />
                        <Button.Group id="add-button">
                            <Button  onClick={() => this.addInput("step")} icon>
                                <Icon name="add" />
                            </Button>
                            <Button onClick={() => this.deleteInput("step", Number(stepInput.slice(5)))} icon>
                                <Icon name="delete" />
                            </Button>
                        </Button.Group>
                    </div>
                )
            }
            
            
        })  
    }

    handleChange = (inputType,event) => {
        if (inputType === "ingredient") {
            let inputId = event.target.id,
                inputIndex = Number(inputId.slice(11)),
                newIngredients = [...this.state.ingredients]
    
                newIngredients[inputIndex] = event.target.value
    
                this.setState({
                    ingredients:newIngredients
                }, () => console.log(this.state.ingredients))
        } else {
            let inputId = event.target.id,
                inputIndex = Number(inputId.slice(5)),
                newSteps = [...this.state.steps]

                newSteps[inputIndex] = event.target.value

                this.setState({
                    steps:newSteps
                }, () => console.log(this.state.steps))
        }

    }

    addInput= (inputType) => {
        if (inputType === "ingredient") {

            let newInput = `ingredient-${this.state.ingredientInputs.length}`,
                newIngredients = [...this.state.ingredients,""]
            this.setState({
                ingredients:newIngredients,
                ingredientInputs:[...this.state.ingredientInputs,newInput]
            }, () => console.log(this.state.ingredients))
        } else {
            let newInput = `step-${this.state.stepInputs.length}`,
                newSteps = [...this.state.steps,""]
            this.setState({
                steps:newSteps,
                stepInputs:[...this.state.stepInputs,newInput]})
        }
    }

    handleSubmit = () => {
        console.log(this.state);
    }

    render() {
        const {imgSrc} = this.state
        return (
            <div className='content-feed'>
                <h1>New Recipe</h1>
                <Segment textAlign="center">
                    <Form.Field onChange={this.recipeNameChange} placeholder="Recipe Name">
                        <h4>Recipe Name</h4>
                        <Input id="input-test" textAlign="center" placeholder='Recipe Name' />
                    </Form.Field>
                        <br/>
                        {imgSrc !== null ? 
                        <div className="upload-image-container">
                            <Image src={imgSrc} rounded /> 
                        </div>
                            : ''}
                </Segment>
                <Segment>
                    <Dropzone onDrop={this.handleImageUpload} accept='image/jpeg, image/png' multiple={false}>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Click or Drag 'n' Drop an Image Here! </p>
                            </div>
                        )}
                    </Dropzone>
                    {/* <ImageUpload /> */}
                </Segment>
                <Segment>
                    <strong>{this.state.keywords.join(" / ")}</strong>
                </Segment>
                <Segment>
                    <h4>Keywords (Max. 5)</h4>
                    <Button.Group>
                        {this.addKeywordButtons(0,5)}<br/>
                    </Button.Group>
                    <Button.Group>
                        {this.addKeywordButtons(5,10)}<br/>
                    </Button.Group>
                    <Button.Group>
                        {this.addKeywordButtons(10,15)}<br/>
                    </Button.Group>
                </Segment>
                <Segment textAlign="left">
                    <center><h4>Ingredient Input</h4></center>
                    <center><i>Please Specify Amount As Well</i></center><br/>
                    <Form.Field>
                        {this.renderIngredientInputs()}
                    </Form.Field>
                </Segment>
                <Segment textAlign="left">
                    <center><h4>Steps Input</h4></center>
                    <Form.Field>
                        {this.renderStepInputs()}
                    </Form.Field>
                </Segment>
                <Segment>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </Segment>

            </div>
        );
    }
}

export default NewRecipe;
