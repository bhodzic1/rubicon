import React, { useContext } from 'react';
import Movie from '../card/Movie';
import { IMovie, IState } from '../../interfaces';
import { MovieContext } from '../../context/MovieContext';
import { Link } from 'react-router-dom';

const defaultMovies: IMovie[] = [];

const MovieList: React.FC = () => {
    const {state: { movies, query }, dispatch: { updateStorage } } = useContext(MovieContext)

    return (
        <div className="containerApp">
            {
               movies.map((movie) => (
                   <Link className="linkCard" to={{ pathname: "/movie/details/" + movie.id }}><Movie key={movie.id} id={movie.id} title={movie.title} poster_path={movie.poster_path} /></Link>
               ))
            }
            <button>Click</button>
        </div>
    )
}

export default MovieList;