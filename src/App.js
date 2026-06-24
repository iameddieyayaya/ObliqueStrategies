import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { edition1 } from "./strategies/edition-1";
import { edition2 } from "./strategies/edition-2";
import { edition3 } from "./strategies/edition-3";
import { edition4 } from "./strategies/edition-4";
import { edition5 } from "./strategies/edition-5";

import "./App.css";

const editions = [edition1, edition2, edition3, edition4, edition5];

function App() {
  const [background, setBackground] = useState("");
  const [strategy, setStrategy] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const randomEdition = editions[Math.floor(Math.random() * editions.length)];
    const randomStrategy =
      randomEdition.strategies[
        Math.floor(Math.random() * randomEdition.strategies.length)
      ];

    const imageUrl = `https://picsum.photos/1600/900?random=${Date.now()}`;
    const img = new Image();

    img.onload = () => {
      setStrategy(randomStrategy);
      setBackground(imageUrl);
      setIsReady(true);
    };

    img.onerror = () => {
      setStrategy(randomStrategy);
      setIsReady(true);
    };

    img.src = imageUrl;
  }, []);

  const props = useSpring({
    opacity: isReady ? 1 : 0,
    transform: isReady ? "translateY(0px)" : "translateY(16px)",
    config: { tension: 120, friction: 18 },
  });

  const style = {
    backgroundImage: background ? `url(${background})` : "none",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={style} className="App">
      {!isReady && <div className="loader">Loading...</div>}

      {isReady && (
        <animated.div style={props}>
          <div className="card">
            <h3>{strategy}</h3>
          </div>
        </animated.div>
      )}
    </div>
  );
}

export default App;