import React,{useState} from 'react';
import TypingEffect from './TypingEffect';
import MarkdownDisplay from './MarkdownDisplay';
import './Message.css';

function createPdfAnchor(metadata, index) {
  const { document_name, page_number } = metadata;
  const filePath = `http://localhost:5000/files/${document_name}#page=${page_number}`;
  return `<a href="${filePath}" target="_blank" rel="noopener noreferrer">Reference_${index + 1}</a>`;
}

function Message({ sender, text, isError,index, len, refSection=[]}) {
  const [typingComplete, setTypingComplete] = useState(false);

  const handleTypingComplete = () => {
    setTypingComplete(true);
  };

  
  return (
    <div className={`message ${sender === 'user' ? 'user-message' : 'bot-message'}`}>
      <div className={`message-bubble ${sender} ${isError? 'error':''}`}>
      {sender === 'user' ? (
          text
        ) : (
          index === len - 1 ? <TypingEffect text={text} onComplete={handleTypingComplete} /> : <MarkdownDisplay text={text} />
        )}

        <div id="section">
          {typingComplete && sender === 'bot' && refSection.map((item, idx) => (
            <div key={idx}>
              <strong>Section {idx + 1}:</strong><br />
              <TypingEffect text={text} /><br />
              <span dangerouslySetInnerHTML={{ __html: createPdfAnchor(item.metadata,idx) }} /><br /><br />
            </div>
          ))}
      </div>
      </div>
    </div>
  );
}

export default Message;
