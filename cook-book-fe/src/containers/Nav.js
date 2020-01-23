import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Nav extends Component {

    render() {
        if(this.props.currentUser !== null) {

         return (
            <div className="nav">
                <NavLink to="/home"><Button fluid>Home</Button></NavLink>
                <NavLink to="/new-recipe"><Button fluid>Add Recipe</Button></NavLink>
                <NavLink to="/my-cookbooks"><Button fluid>My Cookbooks</Button></NavLink>
                <NavLink to={`/profile/${localStorage.user}`}><Button fluid>Profile</Button></NavLink>
                <NavLink to='/keyword-search'><Button fluid>Keyword Search</Button></NavLink>  
            </div>
        )
        } else {
            return (
            <div className="nav">
                <NavLink to="/home"><Button fluid>Home</Button></NavLink>
                <NavLink to="/new-recipe"><Button fluid>Add Recipe</Button></NavLink>
                <NavLink to="/my-cookbooks"><Button fluid>My Cookbooks</Button></NavLink>
                <Button fluid>Profile</Button>
                <NavLink to='/keyword-search'><Button fluid>Keyword Search</Button></NavLink>  
            </div>
            )
        }

    }
}

export default Nav;