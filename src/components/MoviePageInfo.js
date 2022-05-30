import './MoviePageInfo.css'

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import authHeader from "./authHeader";
import TrailerPlayer from './TrailerPlayer';

const MoviePageInfo = props => {

    let { id } = useParams();
    const [picture, setPicture] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/movies/photo/${id}`, { responseType: 'blob' }, { headers: authHeader() })
            .then(res => {
                if (res.data.error) {
                    alert("Something went wrong!")
                } else {
                    setPicture(URL.createObjectURL(res.data));
                }


            })



    }, [])

  

    return (
        <div className="wrapper">
            <div className="movie-page-info-container">
                <div className="movie-page-title" ><h1>{props.movie.title}</h1></div>
                <div className="movie-page-poster">
                    <img className="movie-page-poster1" src={picture} />
                </div>
                <div className="movie-page-description">
                    <div> <h4>Description:</h4>  {props.movie.description}</div>
                </div>
                <div className="movie-page-infos">
                    <div className="movie-page-rating"><h4> IMDB rating: </h4> {props.movie.rating}</div>
                    <div className="movie-page-director"><h4>Director:</h4> {props.movie.director}</div>
                    <div className="movie-page-length"><h4>Length of the movie: </h4>{props.movie.length} minutes</div>
                    <div className="movie-page-genre"><h4>Genre: </h4> {props.movie.genre}</div>
                </div>

            </div>
            <div className="movie-page-trailer"> <TrailerPlayer movie={props.movie} /> </div>
           
        </div>

    )
}

export default MoviePageInfo