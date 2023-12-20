import { useNavigate } from "react-router-dom";
import { SelectButton } from "../components/SelectButton";
import { useEffect } from "react";
import "../css/ParamsPage.css";
import logo from "../assets/Logo Black.svg";

interface sharedProps {
  seedNames: string[];
  setSeedNames: React.Dispatch<React.SetStateAction<string[]>>;
}

/**
 * Component in charge of the Seeds page.
 * @param props shared props for seeds
 * @returns graphics for seeds page
 */
export function SeedsPage(props: sharedProps) {
  const { seedNames } = props;
  const seedNameList: string[] = ["Artists", "Genres", "Tracks"];

  const nav = useNavigate();

  /**
   * Changes the background color upon load.
   */
  useEffect(() => {
    document.body.style.backgroundColor = "#B8DDF9";
    // const logo: HTMLElement | null = document.querySelector("a#logo h2");
    // if (logo) {
    //   logo.style.color = "black";
    // }
  }, []);

  /**
   * Disables users from continuing without selecting any seeds.
   */
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
        <main
          aria-label="Feature parameter selection page"
          className="container-fluid"
        >
          <nav className="row flex-nowrap">
            <a aria-label="Amplify Logo" id="logo" href="/">
              {/* <h2>Amplify</h2> */}
              <img src={logo} alt="Amplify Logo"></img>
            </a>
            <button
              aria-label="Continue"
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
            <div
              aria-label="Seeds to use as parameters in playlist generation"
              className="params"
            >
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
