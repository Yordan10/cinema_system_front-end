import authHeader from "../authHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import './EditMovie.css'
const EditMovie = () => {
    let { id } = useParams();
    const [movie, setMovie] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [length, setLength] = useState(0);
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState(0);
    const [director, setDirector] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        const getData = () => {
            axios
                .get(`http://localhost:8080/movies/${id}`, { headers: authHeader(), })
                .then((res) => {
                    if (res.data.error) {
                        console.log(res.data);
                        alert("Something went wrong");
                    }
                    else {
                        setMovie(res.data)
                       
                    }
                })
        }
        getData();
    }, []);

    const editMovie = () =>{
        axios
        .post(`http://localhost:8080/movies/editMovie`,{id,title,description,length,genre,rating,director},{headers: authHeader()})
        .then((res) => {
            if (res.data.error) {
                alert(res.data);
            }
           
        })
    }


    const handleTitleChange = (e) => {
        e.preventDefault();

        setTitle(e.target.value);

    };
    const handleDescriptionChange = (e) => {
        e.preventDefault();

        setDescription(e.target.value);

    };
    const handleLengthChange = (e) => {
        e.preventDefault();

        setLength(e.target.value);

    };

    const handleGenreChange = (e) => {
        e.preventDefault();

        setGenre(e.target.value);

    };

    const handleRatingChange = (e) => {
        e.preventDefault();

        setRating(e.target.value);

    };
    const handleDirectorChange = (e) => {
        e.preventDefault();

        setDirector(e.target.value);

    };

    
   /* const FileChangeHandler = (e) => {
        e.preventDefault();

        formData.append('file', e.target.files[0]);


    };*/

    const handleSubmit = (e) => {
        e.preventDefault();

       editMovie();
        window.location.reload();
    }
    return (
        <form method = "post" id ="eddMovie-form" onSubmit={handleSubmit}>
            <div className="edit-movie-container">

            <p>{errorMessage}</p>
                <h1>Edit movie</h1>

                <div className="textbox">
                <h5>Title:</h5>
                    <input type="text" placeholder=" Title of the movie" defaultValue={movie.title} id="title" name="title" onChange={handleTitleChange} /> <br />
                </div>

                <h5>Description:</h5>
                <div className="addMovie-description">
                
                    <textarea placeholder=" Descrition of the movie" defaultValue={movie.description} id="des" name="des" onChange={handleDescriptionChange} rows="4" /> <br />
                </div>

                <div className="textbox">
                <h5>Length:</h5>
                    <input type="text" placeholder=" Length of the movie" defaultValue={movie.length} id="len" name="len" onChange={handleLengthChange} /> <br />
                </div>

                <div className="textbox">
                <h5>Genre:</h5>
                    <input type="text" placeholder=" Genre of the movie" defaultValue={movie.genre} id="genre" name="genre" onChange={handleGenreChange} /> <br />
                </div>

                <div className="textbox">
                <h5>Rating:</h5>
                    <input type="text" placeholder=" Rating of the movie" defaultValue = {movie.rating} id="rating" name="rating" onChange={handleRatingChange} /> <br />
                </div>

                <div className="textbox">
                <h5>Director:</h5>
                    <input type="text" placeholder=" Director of the movie" defaultValue = {movie.director} id="director" name="director" onChange={handleDirectorChange} /> <br />
                </div>

            
              
                <input className="btn" type="submit" value="Confirm" id="btnSubmit" />

            </div>
        </form>

    )

}
export default EditMovie