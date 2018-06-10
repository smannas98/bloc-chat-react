import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js'
import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyCjwLWG4eGRdf6ePEAJ47r05JRd3SpRPik",
  authDomain: "bloc-chat-react-d9592.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-d9592.firebaseio.com",
  projectId: "bloc-chat-react-d9592",
  storageBucket: "bloc-chat-react-d9592.appspot.com",
  messagingSenderId: "864396565928"
};
  firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList
         firebase={firebase}
        />
      </div>
    );
  }
}

export default App;
