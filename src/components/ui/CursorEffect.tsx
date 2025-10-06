import React, { useEffect, useRef } from 'react';
import './CursorEffect.css'; // Ensure you create corresponding CSS for styling

const CursorEffect: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const addHoverEffect = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (cursorRef.current && target.closest('a, button')) {
        cursorRef.current.classList.add('hover');
      }
    };

    const removeHoverEffect = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('hover');
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', addHoverEffect);
    document.addEventListener('mouseout', removeHoverEffect);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', addHoverEffect);
      document.removeEventListener('mouseout', removeHoverEffect);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};

export default CursorEffect;
