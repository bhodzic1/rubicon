import React, { createContext, ReactNode, useReducer } from 'react';
import { MovieReducer, setInitialState, updateStorage } from './MovieReducer';
import { IMovie, IState } from '../interfaces';

const defaultMovies: IMovie[] = [
    {
       id : "",
       poster_path : "",
       title : "",
       overview : "" 
    },
    {
        id: "",
        poster_path: "",
        title: "",
        overview: ""
    }
];

interface ContextProps {
    state: IState;
    dispatch: {
        updateStorage: (query: string) => void;
        setMovies: (query: string, movies: IMovie[]) => void;
        updateStateFromStorage: () => void;
    }
}

interface MovieStateProps {
    children: ReactNode;
}

const defaultQuery: string = "";

const queryStorage = localStorage.getItem('query');
//const moviesStorage : IMovie[] = localStorage.getItem('movies') ? localStorage.getItem('movies') : [];

const initialState = { query: defaultQuery, movies: defaultMovies, ...setInitialState() as unknown as {} };

export const MovieContext = createContext<ContextProps>({} as ContextProps);

export const MovieProvider : React.FC<MovieStateProps> = ({ children }) => {
    const [state, dispatch] = useReducer(MovieReducer, initialState);

    const updateStorage = (query : string) => {
        dispatch({ type : 'UPDATE', payload : query})
    }

    const setMovies = (query: string, movies : IMovie[]) => {
        dispatch({ type : 'SET_MOVIES', payload : movies, payloadQuery : query })
    }

    const updateStateFromStorage = () => {
        dispatch({ type : 'UPDATE_STATE_FROM_STORAGE' });
    }

    const values = {
       ...state,
       dispatch
    }

    return (
        <MovieContext.Provider value={{ state, dispatch: { updateStorage, setMovies, updateStateFromStorage } } }>
            { children }
        </MovieContext.Provider>
    )
}