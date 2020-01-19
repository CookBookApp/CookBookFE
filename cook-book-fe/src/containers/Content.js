import React, { Component } from 'react';
import Feed from '../components/Feed'

class Content extends Component {

    render() {
        return (
            <div className="content">
                <Feed recipes={ this.props.recipes } />
            </div>
        );
    }
}

export default Content;