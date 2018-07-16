import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js'
import MessageList from './components/MessageList.js'
import Username from './components/User.js'
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
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      roomId: [],
      activeRoom: '',
      user: ''
    }
  }
  
  setRoom = (room) => {
    this.setState({activeRoom: room});
    console.log(this.state.activeRoom.key)
  }

  setUser = (user) => {
    this.setState({ user : user});
    console.log(user);
  }

  render() {
    return (
      <div className="App">
        <RoomList
         firebase={firebase}
         activeRoom={this.state.activeRoom}
         setRoom={this.setRoom}
        />

        <MessageList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          user={this.state.user}
        />

        <Username 
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          setUser={this.setUser}
          user={this.state.user}
        />
      </div>
    );
  }
}

export default App;
