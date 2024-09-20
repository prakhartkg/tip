import React, { useEffect, useState } from 'react';
import MarkdownDisplay from './MarkdownDisplay';

const TypingEffect = ({ text, speed = 5,onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!text) return;
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length-1) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(intervalId);
        if (onComplete) {
            onComplete(); // Call the onComplete function when done
          }
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <MarkdownDisplay text={displayedText} />;
};

export default TypingEffect;