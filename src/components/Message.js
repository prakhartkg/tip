import React from 'react';
import './Message.css';

function Message({ sender, text }) {
  return (
    <div className={`message ${sender === 'user' ? 'user-message' : 'bot-message'}`}>
      <div className={`message-bubble ${sender}`}>
        {text}
      </div>
    </div>
  );
}

export default Message;
