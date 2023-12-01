import "../css/App.css";
import { useState, useEffect } from "react";
import MusicGraph from "../components/MusicGraph";
//import { InitiateAuth } from "../endpoints/InitialAuth";

export function HomePage() {
  const [word, setWord] = useState<string>("dancing");
  const [barHeights, setBarHeights] = useState<string[]>([
    "2em",
    "5em",
    "4em",
    "10em",
    "7.5em",
    "9em",
    "7.25em",
    "4em",
    "3em",
  ]);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const title = document.getElementsByClassName("title");
    document.body.style.backgroundColor = "#b32cd5";
    setTimeout(() => {
      setBarHeights([
        "3em",
        "4.5em",
        "2em",
        "3.5em",
        "3.75em",
        "7em",
        "8em",
        "5em",
        "5.5em",
      ]);
      setWord("studying");
      document.body.style.backgroundColor = "#FF8F9C";
      title[0].classList.add("studying");
    }, 450); // 450ms delay
    setTimeout(() => {
      setBarHeights([
        "8em",
        "3em",
        "1.5em",
        "5em",
        "4em",
        "3em",
        "6em",
        "5.5em",
        "8em",
      ]);
      setWord("running");
      document.body.style.backgroundColor = "#6C1E13";
      title[0].classList.remove("studying");
      title[0].classList.add("running");
    }, 1100); // 450ms + 500ms + 150ms delay
    setTimeout(() => {
      setBarHeights([
        "6.5em",
        "4em",
        "4.5em",
        "8em",
        "7em",
        "10em",
        "6.5em",
        "1.5em",
        "3em",
      ]);
      setWord("everything");
      document.body.style.backgroundColor = "#353998";
      document.body.style.transitionDuration = "1s";
      title[0].classList.remove("running");
      title[0].classList.add("everything");
      const bars = document.getElementsByClassName("bar");
      for (let i = 0; i < bars.length; i++) {
        bars[i].classList.add("final");
      }
    }, 1900); // 450ms + 500ms + 150ms + 500ms + 300ms delay
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const steps = document.getElementsByClassName("step");
      steps[step].classList.add("highlight");
      if (step > 0) {
        steps[step - 1].classList.remove("highlight");
      } else {
        steps[steps.length - 1].classList.remove("highlight");
      }

      if (step === steps.length - 1) {
        setStep(0);
      } else {
        setStep(step + 1);
      }
    }, 3000);
  }, [step]);

  return (
    <>
      <body>
        <main className="container-fluid">
          <nav className="row flex-nowrap">
            <h2>Amplify</h2>
            <button>Get Started</button>
          </nav>
          <div className="content">
            <MusicGraph barHeights={barHeights} />
            <div className="title">
              <h1>A playlist for</h1>
              <h1>&nbsp;{word}</h1>
              <h1>.</h1>
            </div>
            <h3>
              A Spotify playlist generator that delivers the perfect music, for
              all parts of life.
            </h3>
          </div>
          <div className="steps container-fluid">
            <div className="step">
              <hr />
              Select your parameters
            </div>
            <div className="step">
              <hr />
              Specify music features
            </div>
            <div className="step">
              <hr />
              Generate your playlist
            </div>
            <div className="step">
              <hr />
              Save to your library
            </div>
            <div className="step">
              <hr />
              Listen and enjoy
            </div>
          </div>
        </main>
      </body>
      {/* <InitiateAuth /> */}
    </>
  );
}
