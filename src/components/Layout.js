import React from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import openSocket from 'socket.io-client';

import uuid from 'uuid';

export default class Layout extends React.Component {
    state = {
        messages : [],
        message  : ''
    };
    socket = openSocket('http://localhost:5000');
    componentDidMount() {
        const { socket } = this;
        socket.on('chat message', message => this.appendMessageToState(message));
    }

    appendMessageToState = message =>
        this.setState(prevState => ({ messages: [ ...prevState.messages, message ] }));

    handleMessageChange = e => {
        const message = e.target.value;
        this.setState(() => ({ message }));
    };

    handleSubmit = e => {
        e.preventDefault();
        const { socket } = this;
        const { message } = this.state;
        const chatMessage = {
            id      : uuid(),
            content : message
        };
        socket.emit('chat message', chatMessage);
        this.appendMessageToState(chatMessage);
        this.setState(() => ({ message: '' }));
    };

    render() {
        return (
            <div className='app'>
                <MessageList messages={this.state.messages} />
                <MessageForm
                    socket={this.socket}
                    appendMessageToState={this.appendMessageToState}
                />
            </div>
        );
    }
}
