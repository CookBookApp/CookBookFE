import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from '../containers/Nav';
import Content from '../containers/Content'
import SidePanel from '../containers/SidePanel'
import Search from '../containers/Search'
import Profile from '../components/Profile'

class Home extends Component {

    state = {
        currentUser:{id:1}
    }

    render() {
        return (
            <div className="App">
                <Search />
                <div className="app-bottom-container">
                    <Nav currentUser={ this.state.currentUser } />
                    <Switch>
                        <Route path="/profile" component={<Profile />} />
                        <Route path="/" render={ renderProps => <Content {...renderProps} currentUser={this.state.currentUser} />} /> 
                    </Switch>
                    <SidePanel />
                </div>
            </div>
        );
    }
}

export default Home;