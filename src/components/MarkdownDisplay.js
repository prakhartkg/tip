
import React from 'react';
import { marked } from 'marked';


const MarkdownDisplay = ({ text='' }) => {
  // Replace '/n' with actual new lines
  if(!text) return (<div></div>)
  if(text==='') return (<div></div>)
  const formattedText = text.replace(/\/n/g, '\n');
  // Convert Markdown to HTML
  const htmlContent = marked(formattedText);

  return (

    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownDisplay;