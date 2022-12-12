import React, { Component } from 'react';
import './SearchBox.css';
import store from '../../redux/store';
import { SearchData } from '../../redux/reducer';



class SearchBox extends Component {
    state = {
        searchedValue: '',
        page: 1,
        maximalPages: 1
    }

    componentDidMount() {

        store.subscribe(() => {
            this.setState({ searchedValue: store.getState().searchedValue });
            this.setState({ page: store.getState().page });
            this.setState({ maximalPages: store.getState().maximalPages });

        });
        SearchData(store.getState(), store);
    }

    searchedValueChangeHandler = (e) => {
        store.dispatch({
            type: 'SEARCHED_TEXT_CHANGE',
            payload: e.target.value
        }) 
    }

    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        SearchData(store.getState(), store);
    }

    PreviusPage = () => {
        store.dispatch({
            type: 'CHANGE_PREVIUS_PAGE',
            payload: store.getState().page - 1
        }); 
        SearchData(store.getState(), store);

    }
    NextPage = () => {
        store.dispatch({
            type: 'CHANGE_NEXT_PAGE',
            payload: store.getState().page + 1

        })
        SearchData(store.getState(), store);
    }

    render() {

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={this.statesearchedValue}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchedValueChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!this.state.searchedValue}
                    >
                        Искать
                    </button>
                </form>

                <p>
                    {store.getState().page === 1 || <button style={{ margin: '5px' }} onClick={this.PreviusPage}>Previus Page</button>}
                   
                    {store.getState().page === this.maximalPages || <button style={{ margin: '5px' }} onClick={this.NextPage}>Next Page</button>}

                </p>

            </div>
        );
    }
}

export default SearchBox;