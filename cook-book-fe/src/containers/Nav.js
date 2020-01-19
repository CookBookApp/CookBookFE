import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Nav extends Component {


    render() {
        return (
            <div className="nav">
                <NavLink to="/"><button className="nav-button">Home</button></NavLink>
                <NavLink to="/new-recipe"><button className="nav-button">Add Recipe</button></NavLink>
                <NavLink to="/my-cookbooks"><button className="nav-button">My Cookbooks</button></NavLink>
                <NavLink to={`/profile/${this.props.currentUser.id}`}><button className="nav-button">Profile</button></NavLink>    
            </div>
        )
    }
}

export default Nav;