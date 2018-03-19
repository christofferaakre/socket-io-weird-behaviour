import React from 'react';
import Message from './Message';
export class MessageList extends React.Component {
    renderMessages() {
        return this.props.messages.map(message => <Message key={message.id} {...message} />);
    }

    render() {
        return <div className='messages'>{this.renderMessages()}</div>;
    }
}

export default MessageList;
