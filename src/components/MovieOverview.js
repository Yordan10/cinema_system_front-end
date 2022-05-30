import { useEffect, useState } from 'react';
import './MovieOverview.css';
import axios from 'axios';
import MovieCard from './MovieCard';
import authHeader from './authHeader';

const MovieOverview = () => {
    const [movies, setMovies] = useState(null);

     const getData = async () => {
        const  data  = await axios.get("http://localhost:8080/movies", { headers: authHeader() });
        setMovies(data.data);

     }

    useEffect(() => {
        getData();
    
    }, []);

    return (
        <div className="movie-row-wrapper">
            <h1>Available movies</h1>

            {movies && (
                <div className="movie-row">
                    {movies.map((movie, index) => (
                        <MovieCard movie={movie} key={index} />
                    ))}
                </div>
            )
            }
        </div>
    )

}


export default MovieOverview