import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './ManageMovies.css';
import authHeader from './authHeader';
import axios from 'axios';
import AdminViewMovie from './CRUDMovies/AdminViewMovie';

const ManageMovie = () => {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        const getData = () => {
            axios
                .get("http://localhost:8080/movies", { headers: authHeader() })
                .then((res) => {
                    if (res.data.error) {
                        console.log(res.data);
                        alert("Something went wrong");
                    }
                    else {
                        setMovies(res.data)
                        
                    }
                })
        }
        getData();
    });
    return (
        <div className="manage-movies-container">
            <button className="add-movie-button">
                <Link to="/addMovie" className="link-add-movie-button"> Add new movie?</Link>
            </button>
            <div className="edit-and-delete-container">

            {movies && (
                <div className="movie-row">
                    {movies.map((movie, index) => (
                        <AdminViewMovie movie={movie} key={index} />
                    ))}
                </div>
            )
            }
            </div>
        </div>

    )
}

export default ManageMovie