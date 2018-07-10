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

    handleChange(e) {
        this.setState({ newRoomName: e.target.value})
    }
    
    render() {
        return (
            <div>
                {
                    this.state.rooms.map( (room) =>
                    <div key={room.key} onClick={() => this.props.setRoom(room)} >{room.name}</div>
                )
                }

                 <form onSubmit={ (e) => { e.preventDefault(); this.createRoom(); }}>
                    <label for="roomName">{this.state.activeRoom.name}</label>
                    <input type="text" id="roomName" value={ this.state.newRoomName } onChange={ this.handleChange.bind(this) }></input>
                    <input type="submit" ></input>
                 </form>
            </div>
        );
    }
}

export default RoomList;