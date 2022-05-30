import { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from './authHeader';
import './EditProfileContainer.css'

const EditProfileContainer = ()=>{
   
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const getData = () => {
            axios
                .get("http://localhost:8080/account/user", { headers: authHeader(), })
                .then((res) => {
                    if (res.data.error) {
                        console.log(res.data);
                        alert("Something went wrong");
                    } else {
                        setFirstName(res.data.firstName);
                        setLastName(res.data.lastName);
                        setEmail(res.data.email);
                    }
                });
        }
        getData();
    }, []);


    const changeUserDetails = () => {
        axios
            .post("http://localhost:8080/account/edit", { firstName, lastName, email }, { headers: authHeader() })
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data);
                    alert("Something went wrong");
                }
            })
    }


    const handleFirstNameChange = (e) => {
        e.preventDefault();

        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        e.preventDefault();

        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        e.preventDefault();

        setEmail(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email) {
            alert("Please fill in all the required fields.");
            return;
        } else {
            changeUserDetails()
        }

       
        window.location.reload();
    };


    return (
        <form method="post" id="login-form" onSubmit={handleFormSubmit}>
            <div className="edit-profile-container">
                <h1 className="edit-profile-header">Account settings</h1>
                <div className="edit-field">
                    <h1 className="edit-field-header">First name</h1>
                    <input className="edit-field-input" type="text" value={firstName} id="first-name" name="first-name" onChange={handleFirstNameChange} /><br />
                </div>
                <div className="edit-field">
                    <h1 className="edit-field-header">Last name</h1>
                    <input type="text" className="edit-field-input" value={lastName} id="last-name" name="last-name" onChange={handleLastNameChange} /><br />
                </div>
                <div className="edit-field">
                    <h1 className="edit-field-header">E-mail address</h1>
                    <input type="text" className="edit-field-input" value={email} id="email" name="email" onChange={handleEmailChange} /><br />
                </div>

                <button className="edit-profile-submit">Submit</button>


            </div>
        </form>
    )

}

export default EditProfileContainer