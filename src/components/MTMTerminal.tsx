import { useState, useEffect } from 'react';

interface MTMTerminalProps {
  content: string;
  speed?: number;
}

const MTMTerminal = ({ content = "", speed = 50 }: MTMTerminalProps) => {
  const [displayedContent, setDisplayedContent] = useState("");

  // Reset and reanimate when content changes
  useEffect(() => {
    setDisplayedContent(""); // Clear previous content
    let currentText = "";
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex < content.length) {
        currentText += content[currentIndex];
        setDisplayedContent(currentText);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    // Cleanup on unmount or content change
    return () => clearInterval(intervalId);
  }, [content, speed]);

  return (
    <pre className="mtm-terminal font-mono text-green-500 whitespace-pre-wrap break-words overflow-x-hidden w-full">
      {displayedContent}
    </pre>
  );
};

export default MTMTerminal;
