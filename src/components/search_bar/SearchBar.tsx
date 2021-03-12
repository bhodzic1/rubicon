import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MovieContext } from '../../context/MovieContext';
import './searchBar.css';

interface ISearch {
    search : string;
}

const SearchBar: React.FC = () => {
    const { state: { movies, query }, dispatch: { setMovies } } = useContext(MovieContext);
    const [searchText, setSearchText] = useState(query);

    useEffect(() => {
        if (searchText.length > 3) {
            const api_url = `https://api.themoviedb.org/3/search/movie?api_key=3adddc6450cee021ab92328ed2bbd662&language=en-US&page=1&include_adult=false&query=${searchText}`;
            axios.get(api_url).then(response => {
                setMovies(searchText.toString(), response.data.results);
            })
            //updateStateFromStorage();
        } else {
            const api_url = "https://api.themoviedb.org/3/movie/top_rated?api_key=3adddc6450cee021ab92328ed2bbd662";
            axios.get(api_url).then(response => {
                setMovies(searchText.toString(), response.data.results);
            })
        }
    }, [searchText])

    return (
        <input
            className="inputContainer"
            type="text"
            value={ searchText }
            onChange={(
                ev: React.ChangeEvent<HTMLInputElement>,
            ): void => setSearchText(ev.target.value)}
        />
    );
};

export default SearchBar;
