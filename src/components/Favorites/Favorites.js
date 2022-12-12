import React, { Component } from 'react';
import './Favorites.css';
import store from '../../redux/store';
import { Link } from 'react-router-dom';


class Favorites extends Component {
    state = {
        title: 'Новый список',
        favorites: []
    }

    componentDidMount() {
        store.subscribe(() => {
            this.setState({ favorites: store.getState().favorites });
        });
    }

    handleinputTitle = (event) => {
        this.setState({ title: event.target.value });
    }

    deleteFilmFromFavorite = (id) => {
        store.dispatch({
            type: 'REMOVE_FILM_FROM_FAVORITE',
            payload: id
        })
    }

    saveFavorites = () => {
        store.dispatch({
            type: 'SAVE_FAVORITE_TO_LIST',
            payload: this.state.title
        })
    }
    render() {
        return (
            <div>
                <div className="favorites">
                    <input value={this.state.title} onChange={this.handleinputTitle} className="favorites__name" />
                    <ul className="favorites__list">
                        {this.state.favorites.map((item) => {
                            return <li>{item.Title} {item.Year}
                                <button type="button" style={{ margin: '5px' }} onClick={() => this.deleteFilmFromFavorite(item.imdbID)} className="favorites__delete">x</button>
                            </li>;
                        })}
                    </ul>
                    <button type="button" className="favorites__save" onClick={this.saveFavorites} disabled={!this.state.favorites}>Сохранить список</button>
                </div>

                <div style={{margin: '2rem 1rem'}} className="favorites">
                    <h1  style={{textAlign: 'center'}}>Saved Lists:</h1>
                    {store.getState().favoriteLists.map((elem) => {
                        return <p style={{margin: '1rem', textAlign: 'center'}}><Link to={{ pathname: `list/${elem.id}`, state: elem }} >About {elem.title}</Link></p>
                    })}
                </div>
            </div>

        );
    }
}

export default Favorites;