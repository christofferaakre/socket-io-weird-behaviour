import React from 'react';

export const Message = ({ author, content }) => (
    <div className='chat-message'>
        <span>{content}</span>
    </div>
);

export default Message;
