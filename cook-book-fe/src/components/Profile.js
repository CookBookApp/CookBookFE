import React, { Component } from 'react';
import Feed from './Feed'
import { Image, Segment } from 'semantic-ui-react'

class Profile extends Component {

    state = {
        user:{},
        recipes:[]
    }

    componentDidMount () {
       this.getUser()
    }
    getUser = () => {
        let slug = window.location.pathname.slice(9)
        fetch(`http://localhost:3000/users/${slug}`)
        .then(r => r.json())
        .then(user => this.setState({
            user:user,
            recipes:user.recipes
        },console.log(this.props)) )
    }
    
    render() {
        return (
            <div className="content-feed">
                <Segment>
                <Image  centered src={`${this.state.user.image}`} size="small" circular /><br/><h1>{`${this.state.user.username}'s Recipes` }</h1>
                </Segment>
                <Segment>
                <Feed recipes={ this.state.recipes } />
                </Segment>
            </div>
        );
    }
}

export default Profile;