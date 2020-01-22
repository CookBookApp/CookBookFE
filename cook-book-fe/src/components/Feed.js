import React, { Component } from 'react';
import RecipeCard from './RecipeCard'
import _ from 'lodash';
import { Card } from 'semantic-ui-react'

class Feed extends Component {

    createRecipeCards = () => {
        return this.props.recipes.map(recipe => <RecipeCard recipe={recipe} />)
    }

    render() {
        return (
            <div className="feed">
                <Card.Group itemsPerRow={1}>
                    {this.createRecipeCards()}
                </Card.Group>

            </div>
        );
    }

    // constructor(props) {
    //     super(props);
    
    //     // Sets up our initial state
    //     this.state = {
    //       error: false,
    //       hasMore: true,
    //       isLoading: false,
    //       recipes: [],
    //     };
    
    //     // Binds our scroll event handler
    //     window.onscroll = _.debounce(() => {
    //       const { loadrecipes, state: { error, isLoading, hasMore } } = this;
    
    //       if (error || isLoading || !hasMore) return;
    //       // Checks that the page has scrolled to the bottom
    //       if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
    //         loadrecipes();
    //       }
    //     }, 100);
    //   }
    
    //   componentWillMount() {
    //     // Loads some recipes on initial load
    //     this.loadrecipes();
    //   }
    
    //   loadrecipes = () => {
    //     this.setState({ isLoading: true }, () => {
    //         fetch('http://localhost:3000/recipes')
    //         .then(resp => resp.json())
    //         .then((recipes) => {
    //           // Creates a massaged array of user data
    //           console.log(recipes)
    //           const nextRecipes = recipes.map(recipe => ({
    //             user: recipe.user,  
    //             description: recipe.description,
    //             image: recipe.image,
    //             prep_time: recipe.prep_time,
    //             cook_time: recipe.cook_time,
    //             total_time: recipe.total_time

    //           }));
    
    //           // Merges the next recipes into our existing recipes
    //           this.setState({
    //             // Note: Depending on the API you're using, this value may
    //             // be returned as part of the payload to indicate that there
    //             // is no additional data to be loaded
    //             hasMore: (this.state.recipes.length < ),
    //             isLoading: false,
    //             recipes: [...this.state.recipes, ...nextRecipes]
    //           });
    //         })
    //         .catch((err) => {
    //           this.setState({
    //             error: err.message,
    //             isLoading: false,
    //            });
    //         })
    //     });
    //   }
    
    //   render() {
    //     const { error, hasMore, isLoading, recipes } = this.state;
    //     console.log(recipes)
    //     return (
    //       <div>
    //         <h1>Infinite Recipes!</h1>
    //         <p>Scroll down to load more!!</p>
    //         {recipes.map(recipe => (
    //           <RecipeCard key={recipe.id} recipe={recipe} user={recipe.user}/>
    //         ))}
    //         <hr />
    //         {error &&
    //           <div style={{ color: '#900' }}>
    //             {error}
    //           </div>
    //         }
    //         {isLoading &&
    //           <div>Loading...</div>
    //         }
    //         {!hasMore &&
    //           <div>You did it! You reached the end!</div>
    //         }
    //       </div>
    //     );
    //   }

}

export default Feed;