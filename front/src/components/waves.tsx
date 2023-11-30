import { useEffect, useState } from "react";


export function Waves() {
    const [heights, setHeights] = useState([50, 250, 200, 195, 228, 250, 150, 100]);

    // taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 
    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
      }

    useEffect(() => {
      let iteration = 0;
      const intervalID = setInterval(() => {
        if (iteration > 2) {
          clearInterval(intervalID);
        } else {
          setHeights(prevHeights => prevHeights.map(() => getRandomInt(50, 250)));
          iteration++;
        }
      }, 2000);
  
      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalID);
    }, []);
  
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' , height: '350px'}}>
        {heights.map((height, index) => (
          <div key={index} className="bar" style={{ height: height }}></div>
        ))}
      </div>
    );
  }
