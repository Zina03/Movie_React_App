import React, { Component } from 'react';
import './MovieItem.css';

class MovieItem extends Component {
    render() {
        const { imdbID, Title, Year, Poster, addToFavoriteList } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={() => addToFavoriteList({'imdbID' : imdbID,'Title' : Title, 'Year' : Year})}>Добавить в список</button>
                </div>
            </article>
        );
    }
}
 
export default MovieItem;