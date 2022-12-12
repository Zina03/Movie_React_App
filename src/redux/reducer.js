import { nanoid } from "nanoid";

const initialState =
{
    movies: [],
    favorites: [],
    favoriteLists: [],
    searchedValue: 'hello',
    maximalPages: 1,
    page: 1,
    url: 'http://www.omdbapi.com/',
    apiKey: 'bd878062'
}

export async function SearchData(state, store) {
    let response = await fetch(`${state.url}?s=${state.searchedValue}&page=${state.page}&apikey=${state.apiKey}&`);
    let JsonString = await response.json();

    if (JsonString.Response === 'True') {
        store.dispatch({
            type: 'LOAD_FETCHED_DATA',
            payload: { 'Searched': JsonString.Search, 'maximalPages': JsonString.totalResults % 10 === 0 ? JsonString.totalResults / 10 : JsonString.totalResults / 10 + 1 }
        })
    }
    else if (JsonString.Response === 'False') {
        console.log('Data was reseted!')
        store.dispatch({
            type: 'RESET_DATA',
        })
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FILM_TO_FAVORITE':
            {
                let checkFilm = state.favorites.find((f) => action.payload.imdbID === f.imdbID);

                if (undefined !== checkFilm) {
                    console.log("Such film is already exist!");
                }
                else {
                    let result = state.movies.find((f) => action.payload['imdbID'] === f.imdbID);

                    console.log(`Film "${action.payload['Title']}" added! `);

                    return {
                        ...state,
                        favorites: [...state.favorites, { ...result }],
                    };
                }

            }
        case 'REMOVE_FILM_FROM_FAVORITE':
            {
                let result = state.favorites.filter((f) => action.payload !== f.imdbID);
                return {
                    ...state,
                    favorites: [...result],
                };
            }
        case 'SAVE_FAVORITE_TO_LIST':
            {
                let result = {
                    id: nanoid(),
                    title: action.payload,
                    movies: state.favorites
                }
                console.log('Favorites: ')
                console.log([...state.favoriteLists, result]);
                if (state.favorites.length > 0) {

                    console.log('Saved!');

                    return {
                        ...state,
                        favoriteLists: [...state.favoriteLists, result],
                        favorites: []
                    };
                }
            }
        case 'SEARCHED_TEXT_CHANGE':
            {
                return state = {
                    ...state,
                    searchedValue: action.payload,
                    page: 1
                };
            }
        case 'LOAD_FETCHED_DATA':
            {
                return state = {
                    ...state,
                    movies: action.payload['Searched'],
                    maximalPages: action.payload['maximalPages']
                }
            }
        case 'CHANGE_NEXT_PAGE':
            {
                if (action.payload >= state.maximalPages) {

                    return state = {
                        ...state,
                        page: action.payload,
                    }
                }
            }
        case 'CHANGE_PREVIUS_PAGE':
            {
                if (action.payload !== 0) {
                    return state = {
                        ...state,
                        page: action.payload,
                    }
                }
            }
        case 'RESET_DATA':
            {
                console.log(state)
                return state = {
                    ...state,
                    movies: []
                };
            }
        default: return state;
    }
}


export default reducer;