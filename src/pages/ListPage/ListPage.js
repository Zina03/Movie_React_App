import React, { Component } from 'react';
import './ListPage.css';
import store from '../../redux/store';

class ListPage extends Component {  
    render() {
        return (
            <div className="list-page">
                 <h1 className="list-page__title">{this.props.location.state.title}</h1>
                <hr></hr>
                <ul>
                    {this.props.location.state.movies.map((item) => {
                        return (
                            <li >
                                <a href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank">{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul> 
            </div>
        );
    }
}

export default ListPage;