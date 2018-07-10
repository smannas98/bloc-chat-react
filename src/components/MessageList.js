import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages:[], 
            message: "",
            filteredMessages:[],
            roomId: ""
        }

        this.messagesRef = this.props.firebase.database().ref('messages');

    }
    //create a method to filter messages, create a method for when you recieve prop (componentWillRecieveProps)

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const messages = snapshot.val();
            this.setState({ messages: this.state.messages.concat( messages ) });
            });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.activeRoom.key)
        console.log(this.state.messages)
        const filteredMessages = this.state.messages.filter(message => nextProps.activeRoom.key == message.roomId);
        console.log(filteredMessages)
        this.setState({filteredMessages: filteredMessages});
        console.log(this.state.filteredMessages)
    }
    
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.filteredMessages.map((message, i) => 
                                <li key={i}>
                                    {message.content} : {message.roomId}
                                 </li>    
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default MessageList;