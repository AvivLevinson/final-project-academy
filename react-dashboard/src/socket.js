import io from "socket.io-client";

var socket = io("http://localhost:5000/");

export default socket;
