import React, { useState } from 'react';
import { IMovie } from '../../interfaces';


const Movie: React.FC<IMovie> = (props) => {
    return (
        <div>
            <img src={`https://image.tmdb.org/t/p/w200/${props.poster_path}`} alt="123" />
            {
                props.title
            }
        </div>
    )
}

export default Movie;