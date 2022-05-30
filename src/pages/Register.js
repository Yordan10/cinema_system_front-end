import './Register.css'
import { Link } from "react-router-dom";
import { useState } from 'react';


const Register = ({ register }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [errorMessage, setErrorMessage] = useState("");


    const handleFirstNameChange = (e) => {
        e.preventDefault();

        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        e.preventDefault();

        setLastName(e.target.value);
    };

    const handleUsernameChange = (e) => {
        e.preventDefault();

        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();

        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        e.preventDefault();

        setConfirmPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        e.preventDefault();

        setEmail(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!password || !email || !username || !firstName || !lastName ) {
            setErrorMessage("Please fill in all the required fields.");
            return;
        }
        if (password === confirmPassword) {
            if (password.length < 6) {
                setErrorMessage("Password must be at least 6 characters long");
                return;
            }
            setErrorMessage("");
            register(username, password, email,firstName,lastName);
        } else {
            setErrorMessage("Passwords do not match.");
        }
    };
    return (
        <form method="post" id="register-form" onSubmit={handleSubmit}>
            <div class="register-container">
                <p>{errorMessage}</p>
                <h1>Register</h1>
                <div class="reg-container-1">
                    {/* <div class="prefix">
                    <p>Prefix:</p>
                    <div class="prefix-select">
                        <div class="prefix-option">
                            <input type="radio" id="prefix-mr" name="prefix-mr" value="Mr." />
                            <label for="Mr."> Mr.</label>
                        </div>
                        <div class="prefix-option">
                            <input type="radio" id="prefix-mr" name="prefix-mr" value="Ms." />
                            <label for="Mr."> Ms.</label>
                        </div>
                    </div>
                </div> */}
                    <div class="textbox">
                        <input type="text" placeholder="First Name" id="first-name" name="first-name" onChange={handleFirstNameChange}/><br />
                    </div>
                    {/* <div class="textbox">
                        <input type="text" placeholder="Middle Name" id="middle-name" name="middle-name" /><br />
                    </div> */}
                    <div class="textbox">
                        <input type="text" placeholder="Last Name" id="last-name" name="last-name" onChange={handleLastNameChange}/><br />
                    </div>
                    {/* <div class="textbox">
                        <input type="text" placeholder="Date of Birth" id="date-of-birth" name="date-of-birth" /><br />
                    </div> */}
                </div>
                <div class="reg-container-2">
                    <div class="textbox">
                        <input type="text" placeholder="E-mail address" id="email" name="email" onChange={handleEmailChange} /><br />
                    </div>
                    <div class="textbox">
                        <input type="text" placeholder="Username" id="username" name="username" onChange={handleUsernameChange} /><br />
                    </div>
                    <div class="textbox">
                        <input type="password" placeholder="Password" id="password" name="password" onChange={handlePasswordChange} /><br />
                    </div>
                    <div class="textbox">
                        <input type="password" placeholder="Confirm Password" id="confirm-password" name="confirm-password" onChange={handleConfirmPasswordChange} /><br />
                    </div>
                </div>
                <input class="btn" type="submit" value="Confirm" id="btnSubmit" />
                <div class="btn-reg">
                    <p>
                        Already have an account? <Link to="/login">Click here to log in.<br /><br /></Link>
                    </p>
                </div>
            </div>
        </form >
    );
}

export default Register;