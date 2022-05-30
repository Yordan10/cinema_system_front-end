import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './MovieCard.css';
import authHeader from "./authHeader";

const MovieCard = props => {
    const [moviePosterPath, setMoviePicturePath] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/movies/photo/${props.movie.id}`,{responseType:'blob'},{headers: authHeader(),})
            .then(res => {
                setMoviePicturePath(URL.createObjectURL(res.data))
            })
    }, []);

    return (
        <div className="movie-card">
            <Link to={"/movies/" + props.movie.id} className="movie-card-link" >
            <div className="movie-card-poster">
                <img className="movie-card-poster" src={moviePosterPath} />
            </div>
            <div className="movie-card-info">
                <h1>{props.movie.title}</h1>
                <h2>Lenght: {props.movie.length} min</h2> 
                <h2>Rating: {props.movie.rating}</h2>
                <h2>Director: {props.movie.director}</h2>
            </div>
            </Link>
        </div>
       
    )
}

export default MovieCard