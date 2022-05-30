import axios from "axios";
import { useEffect, useState } from "react";
import authHeader from '../components/authHeader';
import './ReservationsAdmin.css'
const ReservationsAdmin = () => {

    const [reservations, setReservations] = useState([]);
    const [reservationsByHighestPrice, setReservationsByHighestPrice] = useState([]);
    const reservationsByLowestPrice = reservationsByHighestPrice.slice(0).reverse();
    const [reservationsForMonth, setReservationsForMonth] = useState([]);

    const [mostRecent, setMostRecent] = useState(true);
    const [highestPrice, setHighestPrice] = useState(false);
    const [lowestPrice, setLowestPrice] = useState(false);
    const [thisMonth, setThisMonth] = useState(false);

    let today = new Date();
    const month = today.getMonth() + 1;

    const getAllReservations = async () => {
        const data = await axios.get("http://localhost:8080/reservation", { headers: authHeader() });
        setReservations(data.data);
    }
    const getAllReservationsOrderByPrice = async () => {
        const data = await axios.get("http://localhost:8080/reservation/highest-price", { headers: authHeader() });
        setReservationsByHighestPrice(data.data);
    }
    const getAllReservationsForMonth = async () => {
        const data = await axios.get("http://localhost:8080/reservation/" + month, { headers: authHeader() });
        setReservationsForMonth(data.data);
    }

    useEffect(() => {
        getAllReservations();
    }, setReservations)

    useEffect(() => {
        getAllReservationsOrderByPrice();

    }, setReservationsByHighestPrice)

    useEffect(() => {
        getAllReservationsForMonth();

    }, setReservationsForMonth)


    const sortChange = (e) => {

        switch (e.target.value) {
            case "most-recent":
                setMostRecent(true)
                setHighestPrice(false)
                setLowestPrice(false)
                setThisMonth(false)
                break;

            case "lowest-price":
                setMostRecent(false)
                setHighestPrice(false)
                setLowestPrice(true)
                setThisMonth(false)
                break;

            case "highest-price":
                setMostRecent(false)
                setHighestPrice(true)
                setLowestPrice(false)
                setThisMonth(false)
                break;
            case "this-month":
                setMostRecent(false)
                setHighestPrice(false)
                setLowestPrice(false)
                setThisMonth(true)
                break;

            default: <></>
                break;
        }
    }


    return (
        <div className="reservations-container">
            <table className="reservation-container">
                <h2>Reservation History</h2>
                <div className="sort-button">
                    <p>Sort by:</p>
                    <select className="custom-seelct" onChange={sortChange}>
                        <option value="most-recent">Most recent </option>
                        <option value="lowest-price">Lowest price</option>
                        <option value="highest-price">Highest price</option>
                        <option value="this-month">This month</option>
                    </select>
                </div>
                <tr className="recent-box-headers">
                    <tr>Account Name</tr>
                    <td>Movie</td>
                    <td>Transaction Date</td>
                    <td>Number of tickets</td>
                    <td >Price</td>
                </tr>

                {mostRecent === true ?

                    reservations.map((reservation, index) => (
                        <tr className="recent-box-item">
                            <td>{reservation.accountName}</td>
                            <td>{reservation.movieName}</td>
                            <td>{reservation.transactionDate}</td>
                            <td>{reservation.numberOfTickets}</td>
                            <td>{reservation.price}</td>
                        </tr>
                    ))

                    :
                    <></>

                }


                {highestPrice === true ?

                    reservationsByHighestPrice.map((reservation, index) => (
                        <tr className="recent-box-item">
                            <td>{reservation.accountName}</td>
                            <td>{reservation.movieName}</td>
                            <td>{reservation.transactionDate}</td>
                            <td>{reservation.numberOfTickets}</td>
                            <td>{reservation.price}</td>
                        </tr>
                    ))

                    :
                    <></>

                }

                {lowestPrice === true ?

                    reservationsByLowestPrice.map((reservation, index) => (
                        <tr className="recent-box-item">
                            <td>{reservation.accountName}</td>
                            <td>{reservation.movieName}</td>
                            <td>{reservation.transactionDate}</td>
                            <td>{reservation.numberOfTickets}</td>
                            <td>{reservation.price}</td>
                        </tr>
                    ))

                    :
                    <></>

                }
                {thisMonth === true ?

                    reservationsForMonth.map((reservation, index) => (
                        <tr className="recent-box-item">
                            <td>{reservation.accountName}</td>
                            <td>{reservation.movieName}</td>
                            <td>{reservation.transactionDate}</td>
                            <td>{reservation.numberOfTickets}</td>
                            <td>{reservation.price}</td>
                        </tr>
                    ))

                    :
                    <></>

                }


            </table>
        </div>
    )
}
export default ReservationsAdmin