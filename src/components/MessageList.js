import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allMessages:[], 
            message: "",
            fliteredMessages:[],
            roomId: ""
        }

        this.messageRef = this.props.firebase.database().ref('messages');

    }
    //create a method to filter messages, create a method for when you recieve prop (componentWillRecieveProps)

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const messages = snapshot.val();
            room.key = snapshot.key;
            this.setState({ allMessages: this.state.allMessages.concat( messages ) });
            });
    }

    componentWillReceiveProps() {

    }

    messageFilter() {
        const message = this.messageRef
        const room = this.props.firebase.database().ref('rooms');
        room.concat.map() => {
            message.filter()
        }
    }
    
    render() {
        return (
            <div>
                {
                    this.state.allMessages.map( (message) =>
                    <div>{message.content}</div>
                )
                }
            </div>
        );
    }
}

export default MessageList;