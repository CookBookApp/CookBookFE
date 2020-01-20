import React, { Component } from 'react';
import Feed from './Feed'

class Profile extends Component {

    state = {
        user:{},
        recipes:[]
    }

    componentDidMount () {
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
        .then(r => r.json())
        .then(user => this.setState({
            user:user,
            recipes:user.recipes
        },console.log(this.props)) )
    }

    render() {
        return (
            <div className="content-feed">
                <h1>{`${this.state.user.username}'s Recipes` }</h1>
                <Feed recipes={ this.state.recipes } />
            </div>
        );
    }
}

export default Profile;