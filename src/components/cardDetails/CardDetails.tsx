import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Link, Redirect } from 'react-router-dom';
import Lists from '../lists/Lists';
import axios from 'axios';
import './cardDetails.css';


export interface DetailsProps extends RouteComponentProps<{ id: string, type: string }> {
    
}



const CardDetails: React.SFC<DetailsProps> = ({ match: { params: { type, id } } }) => {
    const [ title, setTitle] = useState("");
    const [ overview, setOverview] = useState("");
    const [ poster_path, setImage] = useState("");
    const [ videoExist, setVideoExist] = useState(false);
    
    useEffect(() => {
        getDetails();
    }, [] );

    const getDetails = async () => {
        if (type == "movie") {
            const api_url = `https://api.themoviedb.org/3/movie/${id}?api_key=3adddc6450cee021ab92328ed2bbd662`;
            axios.get(api_url).then(response => {
                setTitle(response.data.title);
                setOverview(response.data.overview);
                setImage(response.data.poster_path);
                setVideoExist(response.data.video);
                
            }) 
        } else {
            const api_url = `https://api.themoviedb.org/3/tv/${id}?api_key=3adddc6450cee021ab92328ed2bbd662`;
            axios.get(api_url).then(response => {
                setTitle(response.data.name);
                setOverview(response.data.overview);
                setImage(response.data.backdrop_path);
               
                
            }) 
        }
    }

    
    return (
        <div>
            <h4 className="pageTitle"><b>Movie searcher app</b></h4>
            { type == "movie" &&
                <div className="detailsContainerDiv">
                    <Link to="/"><button className="backButton">&lt; Go Back</button></Link>
                    <br />
                    <br />
                    <div>
                        {videoExist == false && <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt = "123"></img>}
                        {videoExist == true && <video src={`https://api.themoviedb.org/3/movie/${id}/videos?api_key=3adddc6450cee021ab92328ed2bbd662&language=en-US`} controls></video>}
                    </div>
                    <div>
                    <i className="titleDetails">Title:</i> { title }
                    <br />
                    <br />
                    </div>
                    <div>
                        <i className="titleDetails">Overview:</i> <span className="textDetails">{ overview }</span>
                    </div>
                    
                </div>
            }
            { type == "tv" &&
                <div className="detailsContainerDiv">
                    <Link to="/"><button className="backButton">&lt; Go Back</button></Link>
                    <br />
                    <br />
                    <div>
                        {videoExist == false && <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt = "123"></img>}
                        {videoExist == true && <video src={`https://api.themoviedb.org/3/movie/${id}/videos?api_key=3adddc6450cee021ab92328ed2bbd662&language=en-US`} controls></video>}
                    </div>
                    <div>
                    <i className="titleDetails">Title:</i> { title }
                    <br />
                    <br />
                    </div>
                    <div>
                        <i className="titleDetails">Overview:</i> <span className="textDetails">{ overview }</span>
                    </div>
                    
                </div>
            }
        </div>
      )
    
  }
  

export default CardDetails;