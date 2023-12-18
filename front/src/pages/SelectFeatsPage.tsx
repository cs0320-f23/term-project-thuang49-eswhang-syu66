import { useNavigate } from "react-router-dom";
import { Slider } from "../components/Slider";
import { useEffect } from "react";
import "../css/SelectPage.css";
import logo from "../assets/Logo White.svg";

interface sharedProps {
  featNames: string[];
  setFeatNames: React.Dispatch<React.SetStateAction<string[]>>;
  featsMap: Map<string, number>;
}

export function SelectFeatsPage(props: sharedProps) {
  const nav = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#6367BC";
  }, []);
  return (
    <>
      <body>
        <main className="container-fluid">
          <nav className="row flex-nowrap">
            <a id="logo" href="/">
              {/* <h2>Amplify</h2> */}
              <img src={logo} alt="Amplify Logo"></img>
            </a>
            <button
              className="continue-button toggle"
              id="continue-button"
              onClick={() => nav("/select-seeds")}
            >
              Continue
            </button>
          </nav>
          <div className="select-content">
            <div className="select">
              {props.featNames.map((feat) => (
                <div className="select-feat">
                  <h3>{feat}</h3>
                  <Slider featMap={props.featsMap} feat={feat}></Slider>
                </div>
              ))}
            </div>
          </div>

          {/* <Slider featList = {props.featNames} featName = {}></Slider> */}
        </main>
      </body>
    </>
  );
}
