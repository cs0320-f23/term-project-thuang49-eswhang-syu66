import { useNavigate } from "react-router-dom";
import { SelectButton } from "../components/SelectButton";
import { useEffect } from "react";
import "../css/ParamsPage.css";

interface sharedProps {
  seedNames: string[];
  setSeedNames: React.Dispatch<React.SetStateAction<string[]>>;
}
export function SeedsPage(props: sharedProps) {
  const { seedNames } = props;
  const seedNameList: string[] = ["Artists", "Genres", "Tracks"];

  const nav = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#B8DDF9";
    const logo: HTMLElement | null = document.querySelector("a#logo h2");
    if (logo) {
      logo.style.color = "black";
    }
  }, []);

  useEffect(() => {
    const continueButton = document.getElementById("continue-button");
    if (seedNames.length > 0) {
      if (continueButton) {
        continueButton.classList.add("toggle");
      }
    } else {
      if (continueButton) {
        continueButton.classList.remove("toggle");
      }
    }
  }, [seedNames]);

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
              onClick={() => nav("/select-feats")}
            >
              Continue
            </button>
          </nav>
          <div className="params-content">
            <div className="title">
              <h3>Select seeds</h3>
            </div>
            <div className="params">
              {seedNameList.map((seed) => (
                <SelectButton
                  list={props.seedNames}
                  listSetter={props.setSeedNames}
                  toAdd={seed}
                ></SelectButton>
              ))}
            </div>
          </div>
        </main>
      </body>
    </>
  );
}
