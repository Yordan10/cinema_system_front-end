import './AdminViewMovie.css'
import axios from 'axios'
import authHeader from './../authHeader'
import { Link } from "react-router-dom";
import EditMovie from './EditMovie';
import { BrowserRouter as Route } from "react-router-dom"

const AdminViewMovie = props => {
    const movie = props.movie

    const deleteMovie = () => {
        console.log("Wlizam")
        axios
            .post("http://localhost:8080/movies/delete/" + movie.id, { headers: authHeader() })
            .then((res) => {
                if (res.data.error) {
                    alert(res.data);
                }
            })

    }




    return (
        <div className="admin-view-movie">

            <div className="admin-movie-card-info">
                <h1>{movie.title}</h1>
                <h2>Lenght: {movie.length}</h2>
                <h2>Rating: {movie.rating}</h2>
                <h2>Director: {movie.director}</h2>
                <h2>Genre: {movie.genre}</h2>

            </div>
            <div >
                <button className="edit-button1" >
                    <Link to={"/editMovie/" + movie.id} className="link-add-movie-button"> Edit</Link>
                </button>

            </div>
            <div>
                <button className="delete-button1" onClick={deleteMovie} >Delete</button>
            </div>
        </div>
    )
}

export default AdminViewMovie