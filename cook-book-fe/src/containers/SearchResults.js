import React, { Component } from 'react';
import CookbookCard from '../components/CookbookCard'
import RecipeCard from '../components/RecipeCard'
import UserCard from '../components/UserCard'
import Feed from '../components/Feed'

export default class SearchResults extends Component {

    state = {
        allItems: [],
        type: '',
        searchType: '',
        searchValue: '',
        keywordRecipes:null
    }


    getSearchResults = () => {
    let API = 'http://localhost:3000/'
    const { searchType, searchValue } = this.state

        fetch(API + searchType, {
            headers:{
                'Authorization':`Bearer ${localStorage.token}`
            }
        })
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
            })
            }
        )
    }
    componentDidMount(){
        if( this.props.searchType !== 'keywords'){
            this.setState({
                searchValue:this.props.searchValue,
                searchType:this.props.searchType
            }, () => this.getSearchResults() )
        } else  {
            this.setState({
                searchType:this.props.searchType,
                keywordRecipes:this.props.recipes
            },()=> console.log(this.props.keywordRecipes))
        }
    }


    renderPage = () => {
        const { searchType, allItems } = this.state
        if(searchType === "users"){
            return allItems.map(item => <UserCard user={item} />)
        } else if(searchType === "recipes"){
            return allItems.map(item => <RecipeCard recipe={item} />)
        } else if(searchType === "cookbooks"){
            return allItems.map(item => <CookbookCard cookbook={item} />)
        } 
        
    }

    


    render() {
        if (this.state.searchType !== 'keywords') {
            return (
                <div className="content-feed">
                   {this.renderPage()}
                </div>
            )
        } else if( this.state.searchType === 'keywords' && this.props.recipes !== null ){
            return (<div className="content-feed">
                   {this.props.recipes.map(recipe => <RecipeCard recipe={recipe}/>)}
                    </div>
            )
        } else {
            return (<div className="content-feed">
                   
                    </div>
            )
        }
        
    }
}
