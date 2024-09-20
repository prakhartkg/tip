import React from 'react';
import './Message.css';

function Message({ sender, text, isError }) {
  return (
    <div className={`message ${sender === 'user' ? 'user-message' : 'bot-message'}`}>
      <div className={`message-bubble ${sender} ${isError? 'error':''}`}>
        {text}
      </div>
    </div>
  );
}

export default Message;
