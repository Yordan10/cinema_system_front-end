import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import axios from 'axios';
import MoviePageInfo from "../components/MoviePageInfo";
import './Movie.css';
import Reservation from "../components/Reservation";
import { Link } from "react-router-dom";

const Movie = () => {
    const [movie, setMovie] = useState({});
    let { id } = useParams();

    useEffect(  () => {
         axios
            .get(`http://localhost:8080/movies/${id}`)
            .then(res => {
                setMovie(res.data);
            

            })
    }, [])
    return (
        <div className="movie-page">
            <MoviePageInfo movie={movie} />
            {
                localStorage.getItem('accessToken') ?
                    <Reservation movie={movie} />
                    :
                    <p>
                    To make reservation you need to have account<Link to="/login">Click here to login</Link>
                    </p>

            }

        </div>
    )
}
export default Movie