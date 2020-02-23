import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './App.css';

// import { ACCESS_KEY, SECRET_KEY } from './keys';

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

  useEffect(() => {
    fetch('https://oblique-stragies-01.herokuapp.com/api/random')
      .then(response => response.json())
      .then(data => setStrategy(data.randomStrategy));

    // fetch(`https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}`)
    //   .then(response => response.json())
    //   .then(data => setBackground(data.urls.full));

    fetch(`https://source.unsplash.com/featured/?texture,patterns`)
      .then(response => response)
      .then(data => setBackground(data.url));
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
