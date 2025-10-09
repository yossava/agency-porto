'use client';

import { useEffect, useState } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
}

export default function TextScramble({ text, className = '' }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    let frame = 0;
    const iterations = 20;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (frame < iterations) {
              return chars[Math.floor(Math.random() * chars.length)];
            }
            if (index < frame - iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (frame >= text.length + iterations) {
        clearInterval(interval);
        setDisplayText(text);
      }

      frame++;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
}
