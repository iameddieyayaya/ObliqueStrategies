import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    fetch('https://oblique-stragies-01.herokuapp.com/api/random')
      .then(response => response.json())
      .then(json => console.log(json));
  });

  return <div className='App'>hey</div>;
}

export default App;
