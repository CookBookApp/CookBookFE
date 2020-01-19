import React, { Component } from 'react';

class Nav extends Component {


    render() {
        return (
            <div className="nav">
                <button className="nav-button">Home</button>
                <button className="nav-button">Add Recipe</button>
                <button className="nav-button">Profile</button>
            </div>
        )
    }
}

export default Nav;