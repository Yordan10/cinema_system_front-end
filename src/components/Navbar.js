import './Navbar.css';
import { Link } from "react-router-dom";
import Profile from '../pages/Profile';
import authHeader from './authHeader';
import axios from 'axios';
import { useState, useEffect } from "react";
import CrudMovie from './ManageMovie';



const Navbar = ({ logout }) => {


    const [user, setUser] = useState({});

    useEffect(() => {
        const getData = () => {
            axios
                .get("http://localhost:8080/account/user", { headers: authHeader(), })
                .then((res) => {
                    if (res.data.error) {
                        console.log(res.data);
                        alert("Something went wrong");
                    } else {
                        setUser(res.data);
                    }
                });
        }
        getData();
    }, []);


    // const navbar = () => {


    //     if (user.role === "ADMIN") {
    //         <ul className="links">
    //             <li><Link to="/manageMovies" className="nav-profile-btn"> Edit movies</Link></li>
    //             <li><Link to="/adminReservations" className="nav-profile-btn">Reservations </Link></li>
    //         </ul>
    //         return;
    //     }
    //     else if (localStorage.getItem('accessToken')) {
    //         <li><Link to="/reservations">Reservations</Link></li>
    //         return;
    //     }
    //     else {
    //         return null;
    //     }

    // }
    return (
        <nav>
            <div className="logo"><Link to="/">Cinema arena</Link></div>
            <ul className="links">
                <li><Link to="/"> Home</Link></li>
                {localStorage.getItem('accessToken') ?
                    <li><Link to="/chat">Chat</Link></li> : null}
                {user.role === "ADMIN" ?
                    <ul className="links">
                        <li><Link to="/manageMovies" className="nav-profile-btn"> Edit movies</Link></li>
                        <li><Link to="/adminReservations" className="nav-profile-btn">Reservations </Link></li>
                    </ul>
                    :
                    null

                }
                {
                    user.role === "USER" ?
                        <li><Link to="/reservations">Reservations</Link></li>
                        :
                        null
                }



            </ul>
            <div className="nav-other">
                <div className="profile-button">
                    {localStorage.getItem('accessToken') ?
                        <li><Link to="/profile" onClick={Profile} className="nav-profile-btn"> Profile</Link></li>
                        :
                        <div></div>
                    }
                </div>
                <div className="log-button">
                    {localStorage.getItem('accessToken') ?
                        <li><Link to="/login" onClick={logout}>Log out</Link> </li>
                        :
                        <li><Link to="/login">Login</Link></li>
                    }
                </div>
            </div>
        </nav>
    )
}
export default Navbar;