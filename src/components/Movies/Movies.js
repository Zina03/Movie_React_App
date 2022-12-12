import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import store from '../../redux/store';

class Movies extends Component {
    state = {
        movies: []
    }

    componentDidMount() {
        store.subscribe(() => {
            let state = store.getState();
            this.setState({ movies: state.movies });
        })
    }

    addToFavoriteList = (film) => {
        store.dispatch(
            {
                type: "ADD_FILM_TO_FAVORITE",
                payload: film
            }
        )
    }


    render() {
        return (
            <ul className="movies">
                {this.state.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} addToFavoriteList={this.addToFavoriteList} />
                    </li>
                ))}
            </ul>
        );
    }
}

export default Movies;