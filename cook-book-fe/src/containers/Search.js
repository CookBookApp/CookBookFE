import React, { Component } from 'react';
import { Select, Input, Button, Form, Icon } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

class Search extends Component {

    componentWillUpdate() {
        
    //    return localStorage.token ? null : this.props.history.push('/')
    }
    

    state= {
        searchValue: '',
        searchType: ''
    }


    selectOptions = [
        {key: "username", value: "users", text: "Username"},
        {key: "recipe", value: "recipes", text: "Recipe"},
        {key: "cookbook", value: "cookbooks", text: "CookBook"}
    ] 



    handleInputChange = (event) => {
        this.setState({
            searchValue: event.target.value
        })
    }
    

    handleSelectChange = (event, result) => {
        this.setState({
            searchType: result.value
        })
    }
    


    render() {
        if (!localStorage.token) {
            this.props.history.push('/')
        }
        return (
            <div className="search" >
                <Form.Field>
                <Icon style={{'margin-left':'16%'}}name="book" size='large'></Icon>
                    <Input onChange={this.handleInputChange} className="search-input" type="text" />

                    <Select style={{'margin-left':'1rem'}}onChange={this.handleSelectChange} placeholder="Search By" options={this.selectOptions} />
                   
                    <Link to="/search">
                        <Button style={{'margin-left':'1rem'}} color='black' onClick={() => this.props.handleSearch(this.state)}>
                        Search   
                        </Button>
                    </Link>    
                </Form.Field>
            </div>
        );
    }
}

export default withRouter(Search);