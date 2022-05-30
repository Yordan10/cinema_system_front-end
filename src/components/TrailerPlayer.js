
import  YouTube  from "react-youtube";
import authHeader from "./authHeader";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import './TrailerPlayer.css';
function TrailerPlayer(){
    
    const [trailerLink, setTrailerLink] = useState({});
    let { id } = useParams();

    useEffect(() => {
     
        axios
            .get(`http://localhost:8080/movies/trailer/${id}`, { headers: authHeader() })
            .then(res => {
                if (res.data.error) {
                    alert("Something went wrong!")
                } else {
                   
                    setTrailerLink(res.data);
                }
            })
        


    }, [])

    return(
        <div className="movie-page-trailer-player">
             <YouTube videoId={trailerLink.videoLink} className="movie-page-trailer-player"/>  
        </div>
    )

}
export default TrailerPlayer;