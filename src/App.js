import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import {edition1} from './strategies/edition-1'
import {edition2} from './strategies/edition-2'
import {edition3} from './strategies/edition-3'
import {edition4} from './strategies/edition-4'
import {edition5} from './strategies/edition-5'

import './App.css';

function App() {
  const [background, setBackground] = useState();
  const [strategy, setStrategy] = useState();

  const props = useSpring({
    to: async (next, cancel) => {
      await next({ opacity: 0, color: 'rgb(14,26,19)' });
      await next({ opacity: 1, color: '#000' });
    },
    from: { opacity: 0, color: 'red' }
  });

  const style = {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const editions = [
    edition1,
    edition2,
    edition3,
    edition4,
    edition5,
  ];

  useEffect(() => {
    try {
       const randomEditionIndex = Math.floor(Math.random() * editions.length);
       const randomEdition = editions[randomEditionIndex];
   
       const randomStrategyIndex = Math.floor(Math.random() * randomEdition.strategies.length);
       const randomStrategy = randomEdition.strategies[randomStrategyIndex];
   
       setStrategy(randomStrategy);

      fetch(`https://source.unsplash.com/featured/?texture,patterns`)
        .then(response => response)
        .then(data => setBackground(data.url));
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div style={style} className='App'>
      <animated.div style={props}>
        <div className='card'>
          <h3>{strategy}</h3>
        </div>
      </animated.div>
    </div>
  );
}

export default App;
