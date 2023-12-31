import { useEffect } from "react";
import { SelectButton } from "../components/SelectButton";
import "../css/ParamsPage.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/Logo Black.svg";

interface sharedProps {
  featNames: string[];
  setFeatNames: React.Dispatch<React.SetStateAction<string[]>>;

  authToken: string;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Component in charge of the Features page.
 * @param props props for the auth token and feature names
 * @returns elements for the features params page
 */
export function FeatsPage(props: sharedProps) {
  const [searchParams] = useSearchParams();
  const authToken = searchParams.get("success");

  const { featNames } = props;

  // all of the supported parameters
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

  /**
   * Changes the background color upon load.
   */
  useEffect(() => {
    document.body.style.backgroundColor = "#C2C4F7";
    // const logo: HTMLElement | null = document.querySelector("a#logo img");
    // if (logo) {
    //   logo.style.color = "black";
    // }

    if (authToken != undefined) {
      props.setAuthToken(authToken);
    }
  }, []);

  /**
   * Disables the user from continuing without selecting any feature categories.
   */
  useEffect(() => {
    const continueButton = document.getElementById("continue-button");
    if (featNames.length > 0) {
      if (continueButton) {
        continueButton.classList.add("toggle");
      }
    } else {
      if (continueButton) {
        continueButton.classList.remove("toggle");
      }
    }
  }, [featNames]);

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
              onClick={() => nav("/seeds")}
            >
              Continue
            </button>
          </nav>
          <div className="params-content">
            <div className="title">
              <h3>Select parameters</h3>
            </div>
            <div
              aria-label="Features to use as parameters in playlist generation"
              className="params"
            >
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
