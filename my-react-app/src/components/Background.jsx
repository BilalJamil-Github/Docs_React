import React, { useState, useEffect , useRef } from 'react';
import { motion } from 'framer-motion';
import Foreground from './Foreground';
import './Background.css';

function Background() {
  const [filevar, setFilevar] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const refer = useRef();

  const handleSwap = () => {
    setFilevar(!filevar);
  };

  const updateCursorPositions = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateCursorPositions);

    return () => {
      window.removeEventListener('mousemove', updateCursorPositions);
    };
  }, []);

  return (
    <div ref={refer}
      className="container"
      style={{ overflow: 'hidden', position: 'relative', height: '100vh' }} 
    >
      <motion.div
        className="cursor"
        style={{ position: 'absolute', top: cursorPos.y, left: cursorPos.x }}
        animate={{ x: 0, y: 0 }}
      />
      <div style={{ marginTop: '300px' }}>
        <h1 style={{ fontSize: '150px', position: 'relative', marginLeft: '850px', color: 'silver' }}>
          Docs
        </h1>
        <h2 style={{ position: 'relative', marginLeft: '940px', color: 'silver', marginTop: '-100px' }}>
          Documents
        </h2>
      </div>

      <Foreground Allow={filevar} forDrag={refer} />

      <motion.button
        onClick={handleSwap}
        animate={{ rotate: filevar ? 0 : 45 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: '#04AA6D',
          color: 'white',
          fontSize: '50px',
          borderRadius: '50%',
          width: '100px',
          height: '100px',
          position: 'absolute',
          bottom: '50px',
          right: '50px',
        }}
      >
        +
      </motion.button>
    </div>
  );
}

export default Background;
