import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import CookbookCard from './CookbookCard'

class CookbookPage extends Component {

    state = {
        user:{},
        cookbooks:[]
    }

    componentDidMount() {
        console.log(this.props.currentUser)
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
        .then(r => r.json())
        .then(user => {
            
            this.setState({
                user:user,
                cookbooks:user.cookbooks
            })
        })
    }

    renderCookBooks = () => {
        return this.state.cookbooks.map(cookbook => {
          return <CookbookCard cookbook={cookbook} user={this.state.user}/>
        })
    }

    render() {
        return (
            <div className="content-feed">
                <h1>My Cookbooks Page</h1>
                <Card.Group itemsPerRow={1}>
                {this.renderCookBooks()}
                </Card.Group>
            </div>
        );
    }
}

export default CookbookPage;