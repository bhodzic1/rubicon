import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { IMovie } from '../../interfaces';
import axios from 'axios';
import * as H from "history";
import SearchBar from '../search_bar/SearchBar';
import { MovieContext } from '../../context/MovieContext';

interface MatchParams {
    id : string;
    type : string;
}

export interface MovieDetailsProps extends RouteComponentProps<MatchParams> {
    history : H.History;
}



const MovieDetails: React.FC<MovieDetailsProps> = ({ match : { params : { type, id }}}) => {
    let { state: { query } } = useContext(MovieContext);
    const [movie, setMovie] = useState();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const history  = useHistory();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        if (type === "movie") {
            const api_url = `https://api.themoviedb.org/3/movie/${id}?api_key=3adddc6450cee021ab92328ed2bbd662`;
            axios.get(api_url).then(response => {
                setTitle(response.data.title);
                setImage(response.data.poster_path)
            })
        }
    }

    const goBack = () => {
        history.push('/');
    }

    return (
        <div>
            <button onClick={() => goBack()}>Back</button>
            <img src={`https://image.tmdb.org/t/p/w200/${image}`} alt="123" />
            {
                title
            }
        </div>
    )
}

export default MovieDetails;