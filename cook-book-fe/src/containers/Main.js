import React, { Component } from 'react';
// import LogIn from '../components/LogIn';
// import SignUp from '../components/SignUp';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'



class Main extends Component {

    state = {
        logInClick: false,
        signUpClick: false
    }




    handleClickLogIn = () => {
        console.log("button to login page")
        this.setState({
            logInClick: true,
            signUpClick: false
        })
    }
    
    handleClickSignUp = () => {
        console.log("button to signup page")
        this.setState({
            logInClick: false,
            signUpClick: true
        })
    }
    


    render() {

        return (
            <div>
                <h1>Welcome</h1>
               
                <Link to="/login">Log In</Link>
                <br></br>
                <Link to="/signup">Sign up</Link>
            </div>
        );
    }
}

export default Main;