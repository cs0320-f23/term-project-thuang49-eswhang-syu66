import { useEffect } from "react";
import { SelectButton } from "../components/SelectButton";
import "../css/FeatsPage.css";
import { useNavigate } from "react-router-dom";

interface sharedProps {
  featNames: string[];
  setFeatNames: React.Dispatch<React.SetStateAction<string[]>>;
}
export function FeatsPage(props: sharedProps) {
  const paramNames: string[] = [
    "Acousticness",
    "Danceability",
    "Energy",
    "Instrumentalness",
    "Liveness",
    "Loudness",
    "Popularity",
    "Tempo",
    "Valence",
  ];
  const nav = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#C2C4F7";
  }, []);
  return (
    <>
      <body>
        <main className="container-fluid">
          <nav className="row flex-nowrap">
            <a href="/">
              <h2>Amplify</h2>
            </a>
            <button className="continue-button" onClick={() => nav("/seeds")}>
              {" "}
              Continue{" "}
            </button>
          </nav>
          <div className="content">
            <h3>Select parameters</h3>
            <div className="params">
              {paramNames.map((p) => (
                <SelectButton
                  toAdd={p}
                  list={props.featNames}
                  listSetter={props.setFeatNames}
                ></SelectButton>
              ))}
            </div>
          </div>
        </main>
      </body>
    </>
  );
}
