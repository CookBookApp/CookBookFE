import React, { Component } from 'react'

export default class CookbookCard extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.cookbook.title}</h1>
                <img src={this.props.cookbook.image} />
                <h3>Cook: {this.props.cookbook.user.username}</h3>
            </div>  
        )
    }
}
