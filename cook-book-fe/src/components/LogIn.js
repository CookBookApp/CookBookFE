import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Label, Button, Form} from "semantic-ui-react"


export default class LogIn extends Component {

    




    render() {

        return (

        <div class="ui inverted segment">

            <h1>Log In</h1>

            <form class="ui form">
                <label class="ui pointing below label" > Enter Existing Username: </label>
                <input  type="text" name="name" />
                <br></br>
                <br></br>

                <label class="ui pointing below label"> Password: </label>
                <input type="password" name="password"/>
                <br></br>
                <br></br>

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
