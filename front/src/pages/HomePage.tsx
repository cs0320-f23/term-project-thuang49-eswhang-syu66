import "../css/App.css";
import { useState, useEffect } from "react";
import MusicGraph from "../components/MusicGraph";
import { InitialAuth } from "../endpoints/InitialAuth";
import logo from "../assets/Logo White.svg";

/**
 * Component in charge of the LP
 * @returns home page graphics
 */
export function HomePage() {
  // checking for the presence of an authentication token

  // word in "a playlist for [word]."
  const [word, setWord] = useState<string>("dancing");

  // data to set the heights for the different bars in the music graph
  const [barData, setBarData] = useState<string[][]>([
    ["2em", "", ""],
    ["5em", "", ""],
    ["4em", "", ""],
    ["10em", "", ""],
    ["7.5em", "", ""],
    ["9em", "", ""],
    ["7.25em", "", ""],
    ["4em", "", ""],
    ["3em", "", ""],
    ["8em", "", ""],
  ]);

  // sets the active/highlighted step
  const [step, setStep] = useState<number>(0);

  // steps for using Amplify
  const steps = [
    "Select your parameters",
    "Specify music features",
    "Generate your playlist",
    "Save to your library",
    "Listen and enjoy",
  ];

  /**
   * Timeouts that set up the loading states for opening screens. Each timeout
   * changes the background color, the title, and the bar heights in the graphic.
   */
  useEffect(() => {
    const title = document.getElementsByClassName("title");
    document.body.style.backgroundColor = "#b32cd5";
    setTimeout(() => {
      setBarData([
        ["3em", "", ""],
        ["4.5em", "", ""],
        ["2em", "", ""],
        ["3.5em", "", ""],
        ["3.75em", "", ""],
        ["7em", "", ""],
        ["8em", "", ""],
        ["5em", "", ""],
        ["5.5em", "", ""],
        ["6.5em", "", ""],
      ]);
      setWord("studying");
      document.body.style.backgroundColor = "#FF8F9C";
      title[0].classList.add("studying");
    }, 450); // 450ms delay
    setTimeout(() => {
      setBarData([
        ["8em", "", ""],
        ["3em", "", ""],
        ["1.5em", "", ""],
        ["5em", "", ""],
        ["4em", "", ""],
        ["3em", "", ""],
        ["6em", "", ""],
        ["5.5em", "", ""],
        ["8em", "", ""],
        ["4em", "", ""],
      ]);
      setWord("running");
      document.body.style.backgroundColor = "#6C1E13";
      title[0].classList.remove("studying");
      title[0].classList.add("running");
    }, 1100); // 450ms + 500ms + 150ms delay
    setTimeout(() => {
      setBarData([
        ["6.5em", "", ""],
        ["4em", "", ""],
        ["4.5em", "", ""],
        ["8em", "", ""],
        ["7em", "", ""],
        ["10em", "", ""],
        ["6.5em", "", ""],
        ["1.5em", "", ""],
        ["3em", "", ""],
        ["5.5em", "", ""],
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
    setTimeout(() => {
      const bars = document.getElementsByClassName("bar");
      for (let i = 0; i < bars.length; i++) {
        bars[i].classList.remove("final");
        bars[i].classList.add("static");
      }
      setBarData([
        ["6.5em", "65%", "Popularity"],
        ["4em", "40%", "Danceability"],
        ["4.5em", "45%", "Energy"],
        ["8em", "80%", "Valence"],
        ["7em", "70 BPM", "Tempo"],
        ["10em", "100%", "Instrumentalness"],
        ["6.5em", "65%", "Acousticness"],
        ["1.5em", "NewJeans", "Artist"],
        ["3em", "Jazz", "Genre"],
        ["5.5em", "Clair de Lune", "Track"],
      ]);
    }, 3000);
  }, []);

  /**
   * Sets up the timing for how each step at the bottom of the page is
   * highlighted, via toggling classNames that dictate whether a step is
   * highlighted. Each step is highlighte for three seconds.
   */
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

  // useEffect(() => {
  //   // console.log(props.returnedTracks)
  //   if (authToken == null) {
  //     setNav(<InitialAuth></InitialAuth>);
  //   } else {
  //     // we set the authentication token in the beginning and carry it throughout
  //     // the user experience.
  //     console.log("do something with the token ");

  //     props.setAuthToken(authToken);

  //     setNav(
  //       <div>
  //         <button
  //           className="get-started-button"
  //           id="continue-button"
  //           onClick={() => navigate("/feats")}
  //         >
  //           Continue
  //         </button>

  //       </div>
  //     );
  //   }
  // }, []);

  return (
    <>
      <body>
        <main aria-label="Home page" className="container-fluid">
          <nav className="row flex-nowrap">
            <a aria-label="Amplify Logo" id="logo" href="/">
              {/* <h2>Amplify</h2> */}
              <img src={logo} alt="Amplify Logo"></img>
            </a>
            <div aria-label="Get started">
              <InitialAuth />
            </div>
          </nav>
          <div aria-label="Hero graphic" className="content">
            <MusicGraph barData={barData} />
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
          <div
            aria-label="Steps for using Amplify"
            className="steps container-fluid"
          >
            {steps.map((step: string) => {
              return (
                <div className="step">
                  <hr />
                  <div className="step-number">{steps.indexOf(step) + 1}</div>
                  {step}
                </div>
              );
            })}
          </div>
        </main>
      </body>
    </>
  );
}
