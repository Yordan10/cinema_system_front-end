import { useEffect, useState } from "react"
import axios from "axios";
import authHeader from "./authHeader";
import { Link } from "react-router-dom";
import profileIcon from '../images/profile-icon.png'
import emailIcon from '../images/email-icon.png'
import "./ProfileData.css";
const ProfileData = () => {

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


    return (
        <div className="profile-data-card">
            <div className="profile-picture-box">
                {/* <img src={pic} alt="" /> */}
            </div>
            <div className="profile-details">
                <h1> {user.firstName} {user.lastName}</h1>

                <div className="profile-detail">
                    <img src={profileIcon} />
                    <p>{user.username}</p>
                    <p>{user.role}</p>
                </div>
                <div className="profile-detail">
                    <img src={emailIcon} />
                    <p>{user.email}</p>
                </div>
            </div>

        </div>
    

    )
}

export default ProfileData;