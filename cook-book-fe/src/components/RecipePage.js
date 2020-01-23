import React, { Component } from 'react';
import { TextArea, Image, Segment, List, Modal, Button, Header, Select, Form, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import { storage } from '../Firebase'

class RecipePage extends Component {

    state = {
        recipe:null,
        user:{},
        cookbookOptions:[
            {key: 'new', value: 'new', text: 'Create A Cookbook'}
        ],
        select:'',
        description:'',
        title:'',
        imgUrl:'',
        image:'',
        imgBase:null
    }

    componentDidMount() {
        console.log(this.props.recipe)
        this.getCookbooks()
        if (this.props.recipe === null || this.props.user === null) {
            this.getRecipe()
            
        } else {
            this.setState({
                recipe:this.props.recipe,
                user:this.props.user
            })
        }
    }

    handleSelectChange = (event,result) => {
        this.setState({
            select:result.value
        }, () => console.log(this.state.select))
    }

    addToCookbook = (cookbookId) => {
        fetch('http://localhost:3000/cookbook_recipes', {
            method:'POST',
            headers: {
                'content-type':'application/json',
                'accept':'application/json',
                'Authorization':`Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                cookbook_id:cookbookId,
                recipe_id:this.state.recipe.id
            })
        })
        .then(r => r.json())
        .then(cookbook => {
            console.log(cookbook);
            this.setState({
                select:''
            })
        })
    }
    displayImage = (acceptedFiles,rejectedFiles) => {
        const currentImage = acceptedFiles[0]
        const reader = new FileReader()
        reader.addEventListener("load", ()=>{
            console.log(reader.result)
            this.setState({
                image:currentImage,
                imgBase:reader.result
            })
        },false)
        reader.readAsDataURL(currentImage)
        console.log(acceptedFiles)
    }

    submitCookbook = () => {
        const {image} = this.state;
        console.log(image, storage)


        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed', 
        (snapshot) => {

        }, (error) => {
            console.log(error)
        }, () => {
            //complete function
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                this.setState({
                    imgUrl:url
                }, () => {
                    console.log(this.state)
                    this.postCookbook()
                })
            })
        })
    }

    postCookbook = () => {
        const { title, description, imgUrl } = this.state
        fetch('http://localhost:3000/cookbooks', {
            method:'POST',
            headers: {
                'content-type':'application/json',
                'accept':'application/json',
                'Authorization':`Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                title:title,
                description:description,
                image:imgUrl,
                user_id:localStorage.user
            })
        })
        .then(r => r.json())
        .then(cookbook => {
            console.log(cookbook);
            this.addToCookbook(cookbook.id)

        })
    }

   

    handleInputs = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        }, () => console.log(this.state))
    }

    getCookbooks = () => {
        fetch(`http://localhost:3000/users/${localStorage.user}`, {
            headers: {
                'Authorization':`Bearer ${localStorage.token}`
            }})
           .then(r => r.json())
           .then(user => {
               let newCookbookOptions = user.cookbooks.map(cookbook => {
                   return {key:cookbook.title, value: `${cookbook.id}`, text: cookbook.title}
               })
               this.setState({
                   cookbookOptions:[...this.state.cookbookOptions].concat(newCookbookOptions)
               },() => console.log(this.state.cookbookOptions))
           } )
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
        const {imgBase} = this.state
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
        } else if (this.state.select === 'new') {
            return (
                <div className="content-feed">
                    <Segment>
                        <Image src={this.state.recipe.image} alt="" size='medium' centered circular/>
                        <div style={{textAlign:'center', display:'flex', margin:'auto'}}><Image  src={this.state.user.image} size='mini' circular />Submitted By <Link to={`/profile/${this.state.user.id}`}><h4>{ this.state.user.username }</h4></Link>
                        <Modal trigger={<Button size='tiny'>Add Recipe To Cookbook</Button>} closeIcon>
                            <Modal.Header>Add Recipe To Cookbook</Modal.Header>
                            <Modal.Content image>
                            {imgBase !== null ? 
                        <div className="upload-image-container">
                            <Image wrapped size='medium' src={imgBase}  /> 
                        </div>
                            : <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> }
                            <Modal.Description>
                                <Header>Select An Option</Header>
                                <Select onChange={this.handleSelectChange} options={this.state.cookbookOptions} />
                                <Segment>
                                <Form.Group>
                                    <Input name="title" style={{marginBottom:'1rem'}} onChange={this.handleInputs} placeholder='Title'></Input>
                                    <br />
                                    <TextArea name="description" style={{marginBottom:'1rem'}} onChange={this.handleInputs} placeholder='Description'></TextArea>
                                    <br />
                                    <Dropzone  style={{marginBottom:'1rem'}}onDrop={this.displayImage} accept='image/jpeg, image/png' multiple={false}>
                                    {({getRootProps, getInputProps}) => (
                                        <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Click or Drag 'n' Drop an Image Here! </p>
                                        </div>
                                    )}
                                </Dropzone>
                                    <br />
                                    <Button onClick={this.submitCookbook}>Create & Add</Button>
                                </Form.Group>
                                </Segment>
                                
                            </Modal.Description>
                            </Modal.Content>
                        </Modal>
                        </div>
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
        } else {
            return (
                <div className="content-feed">
                    <Segment>
                        <Image src={this.state.recipe.image} alt="" size='medium' centered circular/>
                        <div style={{textAlign:'center', display:'flex', margin:'auto'}}><Image  src={this.state.user.image} size='mini' circular />Submitted By <Link to={`/profile/${this.state.user.id}`}><h4>{ this.state.user.username }</h4></Link>
                        <Modal closeIcon trigger={<Button size='tiny'>Add Recipe To Cookbook</Button>}>
                            <Modal.Header>Add Recipe To Cookbook</Modal.Header>
                            <Modal.Content>
                            <Modal.Description>
                                <Header>Select An Option</Header>
                                <Select style={{marginBottom:'1rem'}} onChange={this.handleSelectChange} options={this.state.cookbookOptions} />
                                <br />
                                <Button onClick={()=> this.addToCookbook(Number(this.state.select))}>Add to Cookbook</Button>
                            </Modal.Description>
                            </Modal.Content>
                        </Modal>
                        </div>
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
