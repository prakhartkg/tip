import React, { useState,useEffect,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserMessage, sendMessage} from '../store/chatSlice';
import Message from './Message';
import Loader from './Loader';

function ChatWindow() {
  const [userMessage, setUserMessage] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const selectedFile = useSelector((state) => state.files.selectedFile);
  const loading = useSelector((state)=>state.chat.loading);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (userMessage.trim() === '') return;

    // Add the user's message to the chat
    dispatch(addUserMessage(userMessage));
    // Dispatch the async thunk to send the message and get bot response
    dispatch(sendMessage({ message: userMessage, fileId: selectedFile }));

    // Clear the input field
    setUserMessage('');
  };

  return (
    <div className="chat-window flex-grow-1 d-flex flex-column">
      <div className="chat-messages flex-grow-1 p-3" ref={chatWindowRef} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
        {messages.map((msg, index) => (
          <Message key={index} index={index} sender={msg.sender} text={msg.text} isError={msg.error} len={messages.length} refSection={msg.refSection}/>
        ))}
      </div>
      <div className="input-area p-3 d-flex">
        <input
          type="text"
          className="form-control"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button className={`btn ms-2 btn-sm ${userMessage.trim() ? 'btn-primary' : 'btn-secondary'}`} onClick={userMessage.trim() ? handleSendMessage : null} disabled={!userMessage.trim()}>
            <i className="fas fa-paper-plane"></i> Send
        </button>
        {loading && <Loader />}
      </div>
    </div>
  );
}

export default ChatWindow;
