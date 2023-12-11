import { useEffect, useState } from "react";

interface prop {
  feat: string;
  featMap: Map<string, number>;
}

/**
 * Outputs a slider component
 * @param props shared props as defined as abvove.
 * @returns slider component that can identify min and max values
 */
export function Slider(props: prop) {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);

  const normalParams: string[] = [
    "Acousticness",
    "Danceability",
    "Energy",
    "Instrumentalness",
    "Liveness",
    "Valence",
  ];
  /**
   * converts min and max values into acceptable ranges for normal and special
   * parameters. special parameters: loudness, tempo, popularity
   */
  useEffect(() => {
    console.log(props.feat)
    console.log(min);
    console.log(max);
    let addMax = Math.max(min, max)
    let addMin = Math.min(min, max)

    if (normalParams.includes(props.feat)) {
        addMin /= 100
        addMax /= 100
    } else if (props.feat == "Loudness") {
        addMin = ((addMin* 60)/100)-60
        addMax = ((addMax * 60)/100)-60
    } else if (props.feat == "Tempo") {
        addMin *= 4
        addMax *= 4
    }
    props.featMap.set("max_" + props.feat, addMax);
    props.featMap.set("min_" + props.feat, addMin);
    console.log(props.featMap);
  }, [min, max]);

  // updater for min
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMin(Number(event.target.value));
  };

  // updater for max
  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMax(Number(event.target.value));
  };

  return (
    <div className="slide-container">
      <label>{Math.min(min, max)}%</label>
      <div className="double-slider">
        <input
          type="range"
          min='0'
          max='100'
          value={min}
          onChange={handleMinChange}
          style={{
            background: `linear-gradient(to right, rgba(255, 255, 255, 0.25) ${Math.min(
              min,
              max
            )}%, white ${Math.min(min, max)}% ${Math.max(
              min,
              max
            )}%, rgba(255, 255, 255, 0.25) ${Math.max(min, max)}%)`,
            transition: `transition: background ease 1s;`,
          }}
        ></input>
        <input
          type="range"
          min='0'
          max='100'
          value={max}
          onChange={handleMaxChange}
          style={{
            background: `linear-gradient(to right, rgba(255, 255, 255, 0.25) ${Math.min(
              min,
              max
            )}%, white ${Math.min(min, max)}% ${Math.max(
              min,
              max
            )}%, rgba(255, 255, 255, 0.25) ${Math.max(min, max)}%)`,
            transition: `transition: background ease 1s;`,
          }}
        ></input>
      </div>
      <label>{Math.max(min, max)}%</label>
    </div>
  );
}
