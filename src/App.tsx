import React, { useState, useContext, useEffect, ReactText } from 'react';
import './App.css';
import MovieList from './components/lists/MovieList';
import { MovieContext } from './context/MovieContext';
import axios from 'axios';
import SearchBar from './components/search_bar/SearchBar';


const App : React.FC = () => {
  
/*
  const api_url = "https://api.themoviedb.org/3/movie/top_rated?api_key=3adddc6450cee021ab92328ed2bbd662";
  
  const api_url2 = "https://api.themoviedb.org/3/tv/top_rated?api_key=3adddc6450cee021ab92328ed2bbd662";

  const api = `https://api.themoviedb.org/3/search/movie?api_key=3adddc6450cee021ab92328ed2bbd662&language=en-US&page=1&include_adult=false&query=${searchText}`;
  
  const api2 = `https://api.themoviedb.org/3/search/tv?api_key=3adddc6450cee021ab92328ed2bbd662&language=en-US&page=1&include_adult=false&query=${searchText}`;
*/
  
  return (
      <div>
        <SearchBar />
        <MovieList />
      </div>

  )
}

export default App;
