import React, { Component } from 'react';
import { Select, Input, Button, Form} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Search extends Component {

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
        return (
            <div className="search" >
                <Form.Field>
                    <Input onChange={this.handleInputChange} className="search-input" type="text" />

                    <Select onChange={this.handleSelectChange} placeholder="Search By" options={this.selectOptions} />
                   
                    <Link to="/search">
                        <Button onClick={() => this.props.handleSearch(this.state)}>
                        Search   
                        </Button>
                    </Link>    
                </Form.Field>
            </div>
        );
    }
}

export default Search;