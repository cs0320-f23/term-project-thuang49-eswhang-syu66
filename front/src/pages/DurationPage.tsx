import { useNavigate } from "react-router-dom";
import "../css/DurationPage.css";
import { useEffect, useState } from "react";
import { trackResponse } from "../interfaces/trackResponse";

interface sharedProps {
  seedMap: Map<string, string[]>;
  featsMap: Map<string, number>;

  returnedTracks: trackResponse[];
  setReturnedTracks: React.Dispatch<React.SetStateAction<trackResponse[]>>;

  totalTime: number;
  setTotalTime: React.Dispatch<React.SetStateAction<number>>;

  noSongs: number;
  setNoSongs: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * the component in charge of the duration page.
 * @param props shared props as defined above.
 * @returns the html/jselements required for rendering the page.
 */
export function DurationPage(props: sharedProps) {
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [mode, setMode] = useState<string>("duration");
  const nav = useNavigate();

  useEffect(() => {}, [totalDuration, mode]);

  // an updater function
  function updateMode(str: string) {
    setMode(str);
  }

  /**
   * The function responsible for assembling the query to be passed to get_recommendations
   */
  async function submitQuery() {
    const baseurl = "http://localhost:3000/get_recommendations?";
    let url = "";

    // this loops through the seedMap and adds all of the seeds to the query
    for (const [key, value] of props.seedMap) {
      console.log(key);
      let seed = `seed_${key}=`;
      if (value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          seed += `${value[i]}`;
          if (i != value.length - 1) {
            seed += ",";
          }
        }
        url += `${seed}&`;
        console.log(props.seedMap);
      }
    }

    // looping through the featsmap and adding all of the seeds to the query.
    for (const [key, value] of props.featsMap) {
      url += `${key}=${value}&`;
    }

    // performing query.
    const duration = `${mode}=${totalDuration}`;
    const finalQuery = await fetch(baseurl + url + duration).then((res) =>
      res.json()
    );

    console.log(finalQuery);
    if (finalQuery.status == "success") {
      props.setReturnedTracks(finalQuery.data.tracks);
      props.setNoSongs(finalQuery.data.no_songs);
      props.setTotalTime(finalQuery.data.total_ms);
      nav("/results");
    } else {
      console.error("error ocurred in fetch; could not perform query");
    }
    console.log(finalQuery);
    console.log(baseurl + url + duration);
  }

  useEffect(() => {
    const continueButton = document.getElementById("continue-button");
    if (totalDuration > 0) {
      if (continueButton) {
        continueButton.classList.add("toggle");
      }
    } else {
      if (continueButton) {
        continueButton.classList.remove("toggle");
      }
    }
  }, [totalDuration]);

  useEffect(() => {
    document.body.style.backgroundColor = "#162764";
  }, []);

  return (
    <>
      <body>
        <main className="container-fluid">
          <nav className="row flex-nowrap">
            <a id="logo" href="/">
              <h2>Amplify</h2>
            </a>
            <button
              className="continue-button"
              id="continue-button"
              onClick={submitQuery}
            >
              Generate
            </button>
          </nav>
          <div className="duration-content">
            <div className="duration-title">
              <h3>Playlist Duration</h3>
              <div className="duration-options">
                <div className="total-duration duration-option">
                  <input
                    type="radio"
                    id="duration"
                    name="drone"
                    value="duration"
                    onClick={() => {
                      updateMode("duration");
                    }}
                    checked={mode === "duration"}
                  />
                  <label htmlFor="duration">Total Duration</label>
                </div>
                <div className="number-of-songs duration-option">
                  <input
                    type="radio"
                    id="number"
                    name="drone"
                    value="number"
                    onClick={() => {
                      updateMode("number");
                    }}
                    checked={mode === "number"}
                  />
                  <label htmlFor="number">Number of Songs</label>
                </div>
              </div>
            </div>

            <NumberSelector
              totalDuration={totalDuration}
              setTotalDuration={setTotalDuration}
              setMode={setMode}
              mode={mode}
            ></NumberSelector>
          </div>
        </main>
      </body>
    </>
  );
}

interface prop {
  totalDuration: number;
  setTotalDuration: React.Dispatch<React.SetStateAction<number>>;

  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * The component responsible for number selection (inputting duration or no. tracks)
 * @param props shared props, specified in the interface above.
 * @returns the number inputs
 */
function NumberSelector(props: prop) {
  const [val, setVal] = useState<number>(30);
  const [hour, setHour] = useState<number>(0);
  // const [comp, setComp] = useState<JSX.Element>(renderComp());

  useEffect(() => {
    console.log(val);
    if (props.mode == "duration") {
      let totalSec = 0;
      totalSec += hour * 60 * 60;
      totalSec += val * 60;
      const msDuration = totalSec * 1000;
      props.setTotalDuration(msDuration);
    } else if (props.mode == "number") {
      props.setTotalDuration(val);
    }
  }, [val, hour, props.mode]);

  useEffect(() => {
    setVal(30);
    setHour(0);
    if (props.mode == "duration") {
      let totalSec = 0;
      totalSec += hour * 60 * 60;
      totalSec += val * 60;
      const msDuration = totalSec * 1000;
      props.setTotalDuration(msDuration);
    } else if (props.mode == "number") {
      props.setTotalDuration(val);
    }
  }, [props.mode]);

  function changeVal(
    type: string,
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) {
    if (!isNaN(Number(event.target.value))) {
      if (type === "hour") {
        if (Number(event.target.value) > 4) {
          setter(4);
        } else if (Number(event.target.value) < 0) {
          setter(0);
        } else {
          setter(Number(event.target.value));
        }
      } else if (type === "minute") {
        if (Number(event.target.value) > 59) {
          setter(59);
        } else if (Number(event.target.value) < 0) {
          setter(0);
        } else {
          setter(Number(event.target.value));
        }
      } else if (type === "songs") {
        if (Number(event.target.value) > 100) {
          setter(100);
        } else if (Number(event.target.value) < 1) {
          setter(1);
        } else {
          setter(Number(event.target.value));
        }
      } else {
        setter(Number(event.target.value));
      }
    }
  }

  function renderComp() {
    if (props.mode == "duration") {
      return (
        <div className="enter-time number-selector-wrapper">
          <input
            type="number"
            className="hour-selector number-selector"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              return changeVal("hour", event, setHour);
            }}
            max="4"
            value={hour}
          ></input>
          <label>hrs</label>
          <input
            type="number"
            className="minute-selector number-selector"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              return changeVal("minute", event, setVal);
            }}
            max="59"
            value={val}
          ></input>
          <label>mins</label>
        </div>
      );
    } else if (props.mode == "number") {
      return (
        <div className="enter-time number-selector-wrapper">
          <input
            className="number-song-selector number-selector"
            type="number"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              return changeVal("songs", event, setVal);
            }}
            max="100"
            value={val}
          ></input>
          <label>songs</label>
        </div>
      );
    } else {
      console.error("mode not duration or number");
      return <p>error</p>;
    }
  }
  return renderComp();
}
