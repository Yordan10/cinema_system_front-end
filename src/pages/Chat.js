import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './Chat.css'
import authHeader from '../components/authHeader';
import axios from 'axios';
// Set the backend location
const ENDPOINT = "http://localhost:8080/ws";

function Chat() {

  const [stompClient, setStompClient] = useState(null);
  const [msgToSend, setSendMessage] = useState("Enter your message here!");
  // const [msgReceived, setReceivedMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const name = msgToSend;
  let minutes = 0;
  let hours = 0;
  let today = new Date();
  if (today.getMinutes() < 10) {
    minutes = "0" + today.getMinutes();
  }
  else {
    minutes = today.getMinutes();
  }

  if (today.getHours() < 10) {
    hours = "0" + today.getHours();
  }
  else {
    hours = today.getHours();
  }
  const currentHour = hours+ ":" + minutes;

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

  useEffect(() => {
    // use SockJS as the websocket client
    const socket = SockJS(ENDPOINT);

    // Set stomp to use websockets
    const stompClient = Stomp.over(socket);

    // // connect to the backend
    stompClient.connect({}, () => {
      // subscribe to the backend
      stompClient.subscribe('/topic/greetings', (data) => {
        console.log(data);
        onMessageReceived(data);
      });

      stompClient.subscribe('/topic/broadcast', (data) => {
        console.log(data);
        onMessageReceived(data);
      });
    });

    // maintain the client for sending and receiving
    setStompClient(stompClient);
  }, []);

  const messagge = JSON.stringify({ "name": name })

  // send the data using Stomp
  function sendMessage() {

 
    stompClient.send("/app/hello", {}, messagge);
  }

  

  // disconnect from Stomp
  function disconnect() {
    stompClient.disconnect();
  }

  // connect with Stomp
  function connect() {

    console.log(stompClient);
    // connect to the backend
    stompClient.connect({}, () => {
      // subscribe to the backend
      stompClient.subscribe('/topic/greetings', (data) => {
        console.log(data);
        onMessageReceived(data);
      });

      stompClient.subscribe('/topic/broadcast', (data) => {
        console.log(data);
        onMessageReceived(data);
      });
    });
  }

  // display the received data
  function onMessageReceived(data) {
    const result = JSON.parse(data.body);
    setMessages((list) => [...list, result.content]);
   
  }

  
  //TODO, add a solution for disconnection

  return (
    <div className="chat-container">

      <button className="chat-connect-btn" onClick={connect}>Start chat with admin</button>
      <button className="chat-dissconnect-btn" onClick={disconnect}>End the chat</button>

      <br />
      <input  className="chat-input" id='inputname'  placeholder="Write your message here" onChange={(event) => setSendMessage(currentHour +" " + user.username + ":  " + event.target.value)} />
      <button className="send-chat-btn" onClick={sendMessage}>Send Message</button>
      <br />


      <div className="chat-window">

        {messages.map((message) => {
          return <p>{message}</p>
        })}
      </div>
    </div>
  );
}

export default Chat;