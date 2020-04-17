import React from 'react';
import './card.css';

interface IProps {
    title: string;
    poster_path: string;
}

const Lists: React.FC<IProps> = ({ title, poster_path }) => {
    
    return (
        <div className="card">
            <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt = "123"></img>
            <h4 className="title"><b>{ title }</b></h4>
        </div>
    )
}

export default Lists;