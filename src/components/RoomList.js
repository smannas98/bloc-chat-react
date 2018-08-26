import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: "",
            activeRoom: ""
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) });
        });
    }

    createRoom() {
        this.roomsRef.push({
            name: this.state.newRoomName
        });
        this.setState({ newRoomName: ""})
    }

    deleteRoom() {
        this.roomsRef.splice(this.roomsRef.index, 1)
    }

    handleChange(e) {
        this.setState({ newRoomName: e.target.value})
    }
    
    render() {
        return (
            <div className="sideBar">
                <span className="heroTitle">
                    <h1>Bloc Chat</h1>
                </span>
                {

                    this.state.rooms.map( (room) =>
                    <div className="roomList" key={room.key} onClick={() => this.props.setRoom(room)} >{room.name}</div>
                )
                }

                 <form onSubmit={ (e) => { e.preventDefault(); this.createRoom(); }}>
                    <label for="roomName">{this.state.activeRoom.name}</label>
                    <input type="text" id="roomName" value={ this.state.newRoomName } onChange={ this.handleChange.bind(this) }></input>
                    <input type="submit" value="Create Room"></input>
                 </form>
                 <form onSubmit={ (e) => {e.preventDefault(); this.deleteRoom(); }}>
                     <input type="submit" value="Delete Room"></input>
                 </form>
            </div>
        );
    }
}

export default RoomList;