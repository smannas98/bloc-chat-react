import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages:[], 
            message: "",
            filteredMessages:[],
            roomId: "",
            user: '',
            username: ''
        }

        this.messagesRef = this.props.firebase.database().ref('messages');
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.props.user.displayName)
    }
    //create a method to filter messages, create a method for when you recieve prop (componentWillRecieveProps)

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const messages = snapshot.val();
            this.setState({ messages: this.state.messages.concat( messages ) }, () => this.updateFilteredMessages(this.props.activeRoom.key));
            });
    }

    updateFilteredMessages(key) {
        const filteredMessages = this.state.messages.filter(message => key == message.roomId);
        this.setState({filteredMessages: filteredMessages});
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps.activeRoom.key)
        this.updateFilteredMessages(nextProps.activeRoom.key);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({message: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({message: ''});
        this.messagesRef.push({
            username: this.props.user.displayName,
            content: this.state.message,
            sentAt: new Date().toISOString().slice(0,10),
            roomId: this.props.activeRoom.key
        })
    }
    
    render() {
        return (
            <div className="messageList">
                <div className="activeRoomName">{this.props.activeRoom.name}</div>
                <ul className="messageDisplay">
                    {
                        this.state.filteredMessages.map((message, i) => 
                                <li key={i} className="messageContent">
                                    {message.username} : {message.content} : {message.sentAt}
                                 </li>    
                        )
                    }
                </ul>
                <form onSubmit={this.handleSubmit.bind(this)} onChange={this.handleChange.bind(this)} className="messageForm">
                    <input
                        className="textArea"
                        type="textarea"
                        value={this.state.message}
                    ></input>
                    
                    <button type="submit" className="submit">Send Message</button>
                </form>
            </div>
        );
    }
}

export default MessageList;