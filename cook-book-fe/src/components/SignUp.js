import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Label, Form, Input } from 'semantic-ui-react'


export default class SignUp extends Component {







    render() {

        return (
      
            <div class="ui inverted segment">

                <h1>Sign Up</h1>

                <form class="ui form">
                <label class="ui pointing below label" > Enter New Username: </label>
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
