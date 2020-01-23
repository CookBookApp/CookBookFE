import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Button, Label, Form, Input } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import { Image } from 'semantic-ui-react'
import { storage } from '../Firebase';

class SignUp extends Component {



    state = {
        image:'',
        imgBase:null,
        imgUrl:'',
        username:'',
        password:''
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        }, () => console.log(this.state))
    }

    handleSignup = () => {
        console.log(this.state)
        let userData = {
            image:this.state.imgUrl,
            username:this.state.username,
            password:this.state.password
        }


        fetch('http://localhost:3000/users', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                user:{
                username:this.state.username,
                password:this.state.password,
                image:this.state.imgUrl
            }})
        })
        .then(r => r.json())
        .then((resp) => {
            console.log(resp);
            localStorage.token = resp.jwt
            console.log(localStorage.token)
            
            this.props.handleSignup(resp.user)
            this.props.history.push('/home')
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

    submitUser = (event) => {
        event.preventDefault()
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
                    this.handleSignup()
                })
            })
        })
    }



    render() {
        const {imgBase} = this.state
        return (
      
            <div class="ui inverted segment">

                <h1>Sign Up</h1>
                {imgBase !== null ? 
                        <div className="upload-image-container">
                            <Image centered bordered={true} size='small' circular src={imgBase} rounded /> 
                        </div>
                            : ''}
                <form  onSubmit={this.submitUser} class="ui form">
                <label  class="ui pointing below label" > Enter New Username: </label>
                <input onChange={this.handleChange} type="text" name="username" />
                <br></br>
                <br></br>

                <label  class="ui pointing below label"> Password: </label>
                <input onChange={this.handleChange} type="password" name="password"/>
                <br></br>
                <br></br>

                <Dropzone onDrop={this.displayImage} accept='image/jpeg, image/png' multiple={false}>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Click or Drag 'n' Drop an Image Here! </p>
                            </div>
                        )}
                </Dropzone>

                <Button type="submit" value="submit" color="blue">
                Submit
                </Button>
                </form>

                <br></br>

                <Link to="/">Go Back</Link>

            </div>
        )
    }
}

export default withRouter(SignUp)
