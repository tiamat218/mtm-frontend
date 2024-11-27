import { useState, useEffect } from 'react';

interface MTMTerminalProps {
  content: string;
  speed?: number;
  skipAnimation?: boolean;
}

const MTMTerminal: React.FC<MTMTerminalProps> = ({ content, speed = 50, skipAnimation = false }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDisplayedContent('');
    
    if (skipAnimation) {
      setDisplayedContent(content);
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    let currentIndex = 0;
    const contentLength = content.length;

    const typingInterval = setInterval(() => {
      if (currentIndex < contentLength) {
        setDisplayedContent(prev => content.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
      setIsTyping(false);
    };
  }, [content, speed, skipAnimation]);

  return (
    <pre className="font-mono text-green-500 whitespace-pre-wrap select-none user-select-none">
      {displayedContent}
      {isTyping && <span className="animate-blink">_</span>}
    </pre>
  );
};

export default MTMTerminal;
