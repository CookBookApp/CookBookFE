import React, { Component } from 'react'

export default class UserCard extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.user.username}</h1>
                <img src={this.props.user.image} />
            </div>
        )
    }
}
