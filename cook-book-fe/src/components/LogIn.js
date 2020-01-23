import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Label, Button, Form} from "semantic-ui-react"


class LogIn extends Component {

    state = {
        username:'',
        password:''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => console.log(this.state))
    }

    handleLogin = (event) => {
        event.preventDefault()
        fetch('http://localhost:3000/login', {
            method:'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({
                user: {
                    username:this.state.username,
                    password:this.state.password
                }
            })
        })
        .then(r => r.json())
        .then((resp) => {
            localStorage.token = resp.jwt
            console.log(localStorage.token)
            this.props.handleLogin(resp.user)
            this.props.history.push('/home')
        })
    }

    render() {

        return (

        <div class="ui inverted segment">

            <h1>Log In</h1>

            <form onSubmit={this.handleLogin} class="ui form">
                <label class="ui pointing below label" > Enter Existing Username: </label>
                <input  type="text" name="username" onChange={this.handleChange} />
                <br></br>
                <br></br>

                <label class="ui pointing below label"> Password: </label>
                <input type="password" name="password" onChange={this.handleChange}/>
                <br></br>
                <br></br>

                <input type='submit' value='Submit' />
            </form>

            <br></br>

            <Link to="/">Go Back</Link>
            
        </div>

        )
    }
}

export default withRouter(LogIn)
