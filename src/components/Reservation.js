import './Reservation.css';
import { useState, useEffect } from "react";
import axios from "axios";
import authHeader from './authHeader';
import { useParams } from "react-router-dom";

const Reservation = props => {

    let { id } = useParams();

    let movieId = id;
    const [projectionDay, setProjectionDay] = useState("Monday");
    const [projectionHour, setProjectionHour] = useState("21:30");
    const [movie, setMovie] = useState(props.movie);
    const [numberOfTickets, setNumberOfTickets] = useState(0);
    const [price, setPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");



    let today = new Date();
    const transactionDate = today.getFullYear() + '-' + 0 +(today.getMonth() + 1) + '-' + today.getDate();

    const makeReservation = () => {
        axios
            .post("http://localhost:8080/reservation/reserve", { movieId, transactionDate, price, numberOfTickets, projectionDay, projectionHour }, { headers: authHeader() })
            .then((res) => {
                if (res.data.error) {
                    alert(res.data);
                }

            })
    }
    console.log(movieId);
    const DayChange = (e) => {

        switch (e.target.value) {
            case "Monday":
                setProjectionHour("21:30");
                break;
            case "Tuesday":
                setProjectionHour("19:45");
                break;
            case "Wednesday":
                setProjectionHour("19:00");
                break;
            case "Thursday":
                setProjectionHour("18:40");
                break;
            case "Friday":
                setProjectionHour("20:00");
                break;
            case "Saturday":
                setProjectionHour("15:10");
                break;
            case "Sunday":
                setProjectionHour("17:00");
                break;
            default: <></>
        }
        e.preventDefault();
        setProjectionDay(e.target.value);

    }

    const handleNumberOfTicektsChange = (e) => {
        e.preventDefault();
        if (e.target.value >= 0) {
            setNumberOfTickets(e.target.value);
            setPrice(e.target.value * 10.5);
        }
        if (e.target.value > 8) {
            setPrice(e.target.value * 9);
        }

    };
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!projectionDay || !projectionHour || !numberOfTickets || !price) {
            setErrorMessage("Please fill in all the required fields.");
            return;

        }
        if (price < 1) {
            setErrorMessage("Please select at least 1 seat")
            return;

        }
        makeReservation();
        window.location.reload();

    }

    return (
        <form method="post" id="login-form" onSubmit={handleFormSubmit}>
            <div className="reservation-component">
                <h1>
                    Make reservation
                </h1>
                <div className="day-picker">
                    <p>Pick day of the week:</p>
                    <select className="custom-select" onChange={DayChange}>
                        <option value="Monday">Monday </option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>

                </div>
                <div className="info-reservation">
                    <h3>
                        Available time slot for this day: {projectionHour}
                    </h3><br/>
                   <p>Number of seats:</p> 
                    <div className="number-seats">
                        <input type="number" placeholder="Amount" id="amount" name="amount" onChange={handleNumberOfTicektsChange} /><br />
                    </div>

                    <p className="final-price">Total price: € {price}</p>
                </div>
                <input className="finalize-button" type="submit" value="Finalize reservation" id="btnSubmit" />
                <h3>{errorMessage}</h3>

            </div>
        </form>
    )
}

export default Reservation