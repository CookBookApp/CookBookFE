import React, { Component } from 'react';

class CookbookPage extends Component {

    state = {
        cookbooks:[]
    }

    componentDidMount() {
        fetch('http://localhost:3000/cookbooks')
        .then(r => r.json())
        .then(cookbooks => {
            let userCookbooks = cookbooks.filter((cookbook) => {
                return cookbook.user.id === this.props.currentUser.id
            })
            this.setState({
                cookbooks:userCookbooks
            })
        })
    }

    render() {
        return (
            <div className="content-feed">
                <h1>Cookbook Page</h1>
            </div>
        );
    }
}

export default CookbookPage;