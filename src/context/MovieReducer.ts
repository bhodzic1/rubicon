import { IMovie, IState } from "../interfaces";
import axios from 'axios';

/*export enum ActionTypes {
    UPDATE = 'UPDATE',
    SET = 'SET'
}

export interface UpdateAction {
    type: ActionTypes;
    payload: string;
};

export interface SetMoviesAction {
    type: ActionTypes.SET;
    payload: string;
}

export interface Actions {
    UPDATE: UpdateAction;
    SET: SetMoviesAction;
}*/

export type Action =
    | { type: 'UPDATE'; payload: string }
    | { type: 'SET_MOVIES'; payload: IMovie[]; payloadQuery: string }
    | { type: 'UPDATE_STATE_FROM_STORAGE'; }

/*export function updateAction(payload: string): Action {
    return { type: 'UPDATE', payload };
}

export function updateStateFromStorage(): Action {
    return { type: 'UPDATE_STATE_FROM_STORAGE' };
}*/

export const updateStorage = (query : string) => {
    localStorage.setItem('query', query);
    
    const api_url = `https://api.themoviedb.org/3/search/movie?api_key=3adddc6450cee021ab92328ed2bbd662&language=en-US&page=1&include_adult=false&query=${query}`;
    axios.get(api_url).then(response => {
        localStorage.setItem('movies', JSON.stringify(response.data.results));
    })
    
}

export const updateInitialState = (query : string, movies : IMovie[]) => {
    localStorage.setItem('movies', JSON.stringify(movies));
    localStorage.setItem('query', query);
}

const getMoviesFromStorage  = () => {
    const movies = JSON.parse(localStorage.getItem('movies') as string);
    return movies;
}

const getQueryFromStorage = () => {
    const query = localStorage.getItem('query');
    return query ? query : "";
}

const getStateFromStorage = () => {
    const movies = JSON.parse(localStorage.getItem('movies') as string);
    const query = localStorage.getItem('query');
    return { movies, query };
}

export const setInitialState = () => {
    localStorage.setItem('query', '');
    const api_url = "https://api.themoviedb.org/3/movie/top_rated?api_key=3adddc6450cee021ab92328ed2bbd662";
    axios.get(api_url).then(response => {
        localStorage.setItem('movies', JSON.stringify(response.data.results));
    })
}

export const MovieReducer = (state : IState, action : Action) : IState => {
    switch (action.type) {
        case 'UPDATE' :
            console.log(action.payload)
            updateStorage(action.payload) 
            state.movies = getMoviesFromStorage();
            state.query = action.payload;
            return {
                ...state,
                movies: [...state.movies],
                query: action.payload
            }
        case 'SET_MOVIES' :
            state.movies = action.payload;
            //state.query = action.payloadQuery;
            updateInitialState(action.payloadQuery, action.payload)
            return {
                ...state,
                movies: getStateFromStorage().movies,
                query: getQueryFromStorage()
            }
        case 'UPDATE_STATE_FROM_STORAGE' :
            state.movies = getStateFromStorage().movies;
            state.query = getQueryFromStorage();
            return {
                ...state,
                movies: [...state.movies],
                query: state.query
            }
        default:
            return state
    }
}

