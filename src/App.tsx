import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Lists from './components/lists/Lists';
import { RouteComponentProps, Link, Redirect } from 'react-router-dom';
import axios from 'axios';


interface IProps {
  topRatedMovies: any[];
  filteredMovies: any[];
  topRatedShows: any[];
  filteredShows: any[];
  searchText: string;
  moviesActive: boolean;
  showsActive: boolean;
}


class App extends React.Component<RouteComponentProps<any>, IProps> {
  constructor(props:RouteComponentProps) {
    super(props);
    this.state = {
      topRatedMovies: [],
      filteredMovies: [],
      searchText: "",
      moviesActive: false,
      showsActive: true,
      topRatedShows: [],
      filteredShows: []
    }
  }

componentWillMount() {
    const api_url = "https://api.themoviedb.org/3/movie/top_rated?api_key=3adddc6450cee021ab92328ed2bbd662";
    axios.get(api_url).then(response => {
      this.setState({topRatedMovies: response.data.results});
    })
    const api_url2 = "https://api.themoviedb.org/3/tv/top_rated?api_key=3adddc6450cee021ab92328ed2bbd662";
    axios.get(api_url2).then(response => {
      this.setState({topRatedShows: response.data.results});
    })
  
}

updateSearch = (e:any) => {
  this.setState({
    searchText: e.target.value
  })
  const api = `https://api.themoviedb.org/3/search/movie?api_key=3adddc6450cee021ab92328ed2bbd662&language=en-US&page=1&include_adult=false&query=${this.state.searchText}`;
  axios.get(api).then(response => {
    this.setState({filteredMovies: response.data.results});
  })
  
  const api2 = `https://api.themoviedb.org/3/search/tv?api_key=3adddc6450cee021ab92328ed2bbd662&language=en-US&page=1&include_adult=false&query=${this.state.searchText}`;
  axios.get(api2).then(response => {
    this.setState({filteredShows: response.data.results});
  })
  
}

handleMovieClick = () => {
  this.setState({
    moviesActive: true,
    showsActive: false
  })
}

handleShowClick = () => {
  this.setState({
    moviesActive: false,
    showsActive: true
  })
}

  
 render () {
   const tempMovies = this.state.topRatedMovies.slice(0,10);
   const tempShows = this.state.topRatedShows.slice(0,10);
    return (
        <div>
          <h4 className="pageTitle"><b>Movie searcher app</b></h4>
            <div className="searchApp">
              <input type="text" className="searchTermApp" value={ this.state.searchText } onChange={ this.updateSearch } placeholder="Enter movie title"></input>
            </div>
            <div className="switchButtonDiv">
              <button id="movieButton" className={this.state.moviesActive ? 'switchButtonActive': 'switchButton'} onClick={ this.handleMovieClick }>Movies</button>
              <button id="showButton" className={this.state.showsActive ? 'switchButtonActive': 'switchButton'} onClick={ this.handleShowClick }>TV Shows</button>
            </div>
          <div className="containerApp">
            {this.state.searchText.length >= 3 && this.state.moviesActive == true ? this.state.filteredMovies.map(movie => (
              <Link className="linkCard" to={{ pathname:"/movie/details/"+ movie.id, state:{title: movie.title}}}><Lists title = { movie.title }  poster_path = { movie.poster_path } key= { movie.id }></Lists></Link>
          )) : this.state.moviesActive == true && tempMovies.map(movie => (
            <Link className="linkCard" to={{ pathname:"/movie/details/"+ movie.id, state:{title: movie.title}}}><Lists title = { movie.title }  poster_path = { movie.poster_path } key= { movie.id }></Lists></Link>
        ))
          }
          {this.state.searchText.length >= 3 && this.state.showsActive == true ? this.state.filteredShows.map(movie => (
              <Link className="linkCard" to={{ pathname:"/tv/details/"+ movie.id}}><Lists title = { movie.name }  poster_path = { movie.poster_path } key= { movie.id }></Lists></Link>
          )) : this.state.showsActive == true && tempShows.map(movie => (
            <Link className="linkCard" to={{ pathname:"/tv/details/"+ movie.id}}><Lists title = { movie.name }  poster_path = { movie.poster_path } key= { movie.id }></Lists></Link>
        ))
          }
          </div>
        </div>

    )
  }
  
}

export default App;
