import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Background from './components/Background';
import Foreground from './components/Foreground';
import { motion , useMotionValue , useSpring} from 'framer-motion';

function App() {
  const box = useRef(null);
 const cursorsize = 20;
  let [ismousemoving , setismousemoving] = useState(false)
 const mouse = {
    x : useMotionValue(0),
    y: useMotionValue(0)
 }
let smoothmouse = {
  x : useSpring(mouse.x),
  y: useSpring(mouse.y)
}
const [mouseSize, setMouseSize] = useState(20);
let [mouseobj , setmouseobj] = useState({
  position: 'absolute',
  left: smoothmouse.x,
  top: smoothmouse.y,
  backgroundColor: 'orange',
  borderRadius: '50%'
});

  const managemousemove = (e) => {
      const {clientX , clientY} = e
      mouse.x.set(clientX);
      mouse.y.set(clientY);
      if(ismousemoving){
        setMouseSize(20)
       }else{
        setMouseSize(40)
       }
      setismousemoving(true)
      setTimeout(()=>{
    setismousemoving(false)
    setMouseSize(20);
      }, 200)
     

  };

 
  useEffect(() => {
    const handleMouseMove = (e) => managemousemove(e);
    window.addEventListener('mousemove', handleMouseMove);
 
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  },);


  return (
    <>
      <div ref={box} style={{ backgroundColor: 'black', overflow: 'hidden', height: '100vh' }}>
        <motion.div
          dragConstraints={box}
          style={mouseobj}
        />
        <Background reference={box} />
      </div>
    </>
  );
}

export default App;
