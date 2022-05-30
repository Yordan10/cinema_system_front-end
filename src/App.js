import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useState, useEffect } from "react";
import React from 'react';
import Navbar from './components/Navbar.js'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import Profile from './pages/Profile.js'
import Movie from './pages/Movie'
import { createBrowserHistory } from "history";
import authHeader from './components/authHeader';
import ManageMovies from './pages/ManageMovies';
import AddMovie from './components/CRUDMovies/AddMovie'
import EditMovie from './components/CRUDMovies/EditMovie'
import Reservations from './pages/Reservations';
import ReservationsAdmin from './pages/ReservationsAdmin';
import Chat from './pages/Chat';

function App() {
  const history = createBrowserHistory();
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



  const logout = () => {
    localStorage.removeItem('accessToken')
    history.push("/login");
    window.location.reload();

  }



  const login = (username, password) => {
    axios
      .post("http://localhost:8080/login", { username, password })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data);
          alert("Invalid credentials");
        } else {
          localStorage.setItem("accessToken", JSON.stringify(res.data));
          history.push("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          console.log(error.response);
          alert("Wrong username or password");
        } else {
          alert("Something went wrong");
        }
      });
  };

  const register = (username, password, email, firstName, lastName) => {
    let role = "USER";
    axios
      .post("http://localhost:8080/account/register", {
        username,
        password,
        firstName,
        lastName,
        email,
        role

      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data);
          history.push("/login");
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          console.log(error.response);
          alert(error.response.data);
        } else {
          alert("Something went wrong");
        }
      });
  };



  return (
    <div className="App">
      <Router>
        <Navbar logout={logout} />

        <Switch>
          <Route exact path="/" exact component={Home} />

          <Route exact path='/movies/:id' exact component={Movie} />
          {

            localStorage.getItem('accessToken') ?
              <>
                <Route path="/profile" exact component={Profile} />
                <Route path="/addMovie" exact component={AddMovie} />
                <Route path="/editMovie/:id" exact component={EditMovie} />
                <Route path="/manageMovies" exact component={ManageMovies} />
                <Route path="/reservations" exact component={Reservations} />
                <Route path="/adminReservations" exact component={ReservationsAdmin} />
                <Route path="/chat" exact component={Chat} />
              </>
              :
              <>
                <Route path="/register"> <Register register={register} /> </Route>
                <Route path="/login"> <Login login={login} /> </Route>
              </>
          }

        </Switch>
      </Router>
    </div>
  );
}

export default App;
