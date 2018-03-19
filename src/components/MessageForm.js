import React from 'react';
import uuid from 'uuid';
export default class MessageForm extends React.Component {
    state = {
        message : ''
    };

    handleMessageChange = e => {
        const message = e.target.value;
        this.setState(() => ({ message }));
    };

    handleSubmit = e => {
        e.preventDefault();
        const { socket } = this.props;
        const { message } = this.state;
        const chatMessage = {
            id      : uuid(),
            content : message
        };
        socket.emit('chat message', chatMessage);
        this.props.appendMessageToState(chatMessage);
        this.setState(() => ({ message: '' }));
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    value={this.state.message}
                    onChange={this.handleMessageChange}
                    name='message'
                    id='message'
                    placeholder='Type your message'
                />
                <button type='submit'>Send message</button>
            </form>
        );
    }
}
