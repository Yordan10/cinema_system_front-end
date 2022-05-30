import axios from 'axios';
import { useState } from 'react';
import { createBrowserHistory } from "history";
import authHeader from '../authHeader';
import './AddMovie.css';
const AddMovie = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [length, setLength] = useState(0);
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState(0);
    const [director, setDirector] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [trailer,setTrailer] = useState("");
    const formData = new FormData();

    const history = createBrowserHistory();

    const addMovie = () => {
        
        axios
            .post("http://localhost:8080/movies/addMovie",{ title, description, length, genre, rating, director,trailer }, { headers: authHeader() })
            .then((res) => {
                if (res.data.error) {
                    alert(res.data);
                }
               
            })
        setTimeout(() => {  console.log("World!"); }, 2000);
        axios
            .post('http://localhost:8080/movies/upload/photo/'+title.toString(),formData, { headers: authHeader() })
            .then(res => {
                if (res.ok) {
                    console.log(res.data);
                    alert("File uploaded successfully.")
                }
            });
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

    const handleTrailerChange =(e) =>{
        e.preventDefault();

        setTrailer(e.target.value);

    }
    const FileChangeHandler = (e) => {
        e.preventDefault();
    
        formData.append('file', e.target.files[0]);


    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !description || !length || !genre || !rating || !director) {
            setErrorMessage("Please fill all fields")
            return;
        }

        addMovie()

        window.location.reload();
    }


    return (
        <form method="post" id="addMovie-form" onSubmit={handleSubmit}>
            <div className="addMovie-container">
                <p>{errorMessage}</p>
                <h1>Add movie</h1>

                <div className="textbox">
                    <input type="text" placeholder=" Title of the movie" id="title" name="title" onChange={handleTitleChange} /> <br />
                </div>

                <div className="addMovie-description">
                    <textarea placeholder=" Descrition of the movie" id="des" name="des" onChange={handleDescriptionChange} rows="4" /> <br />
                </div>

                <div className="textbox">
                    <input type="text" placeholder=" Length of the movie" id="len" name="len" onChange={handleLengthChange} /> <br />
                </div>

                <div className="textbox">
                    <input type="text" placeholder=" Genre of the movie" id="genre" name="genre" onChange={handleGenreChange} /> <br />
                </div>

                <div className="textbox">
                    <input type="text" placeholder=" Rating of the movie" id="rating" name="rating" onChange={handleRatingChange} /> <br />
                </div>

                <div className="textbox">
                    <input type="text" placeholder=" Director of the movie" id="director" name="director" onChange={handleDirectorChange} /> <br />
                </div>

                <div className="textbox">
                    <input type="text" placeholder="Link of the trailer of the movie" id="trailer" name="director" onChange={handleTrailerChange} /> <br />
                </div>

                <div class="textbox">
                    <input type="file" placeholder="Profile picture" id="profile-picture" name="profile-picture" accept=".jpg, .jpeg, .png" onChange={FileChangeHandler} /><br />
                </div>

              
                <input className="btn" type="submit" value="Confirm" id="btnSubmit" />

            </div>

        </form>


    )
}

export default AddMovie