import React, { Component } from 'react';
import CookbookCard from '../components/CookbookCard'
import RecipeCard from '../components/RecipeCard'
import UserCard from '../components/UserCard'

export default class SearchResults extends Component {

    state = {
        allItems: [],
        type: '',
        searchType: '',
        searchValue: ''
    }


    getSearchResults = () => {
    let API = 'http://localhost:3000/',
    
    searchType = this.props.searchType,
    searchValue = this.props.searchValue

        fetch(API + searchType)
        .then(resp => resp.json())
        .then(allItems => { 
            let newArr
            if(searchType === "users"){
                newArr = allItems.filter(user => user.username.includes(`${searchValue}`))
            } else if (searchType === "recipes") {
                newArr = allItems.filter(recipe => recipe.description.includes(`${searchValue}`))
            } else if(searchType === "cookbooks" ) {
                newArr = allItems.filter(cookbook => cookbook.title.includes(`${searchValue}`))
            }
            this.setState({
                allItems: newArr,
                type: searchType
            })
            }
        )
    }
    componentDidMount(){
        this.setState({
            searchValue:this.props.searchValue,
            searchType:this.props.searchType
        }, () => this.getSearchResults() )
    }


    renderPage = () => {
        if(this.state.type === "users"){
            return this.state.allItems.map(item => <UserCard user={item} />)
        } else if(this.state.type === "recipes"){
            return this.state.allItems.map(item => <RecipeCard recipe={item} />)
        } else if(this.state.type === "cookbooks"){
            return this.state.allItems.map(item => <CookbookCard cookbook={item} />)
        }
    }

    


    render() {
        console.log(this.state)
        return (
            <div className="content-feed">
               {this.renderPage()}
            </div>
        )
    }
}
