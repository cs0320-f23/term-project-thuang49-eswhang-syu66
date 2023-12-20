import { useEffect, useState } from "react";
import { SearchBox } from "../components/SearchBox";
import { SelectedItems } from "../components/SelectedItems";
import { useNavigate } from "react-router-dom";
import "../css/SelectPage.css";
import logo from "../assets/Logo White.svg";

interface sharedProps {
  seedNames: string[];
  setSeedNames: React.Dispatch<React.SetStateAction<string[]>>;
  seedsMap: Map<string, string[]>;
}

export function SelectSeedsPage(props: sharedProps) {
  // selected seeds is an array of arrays where each inner array has the following elements:
  // [0] = id (of the track or artist)
  // [1] = category (indicating track or artit)
  // [2] = name
  // [3] = image path

  // list of selected seeds
  const [selectedSeeds, setSelectedSeeds] = useState<string[][]>([]);

  // the selected seeds, displayed as JSX elements
  const [selectedList, setSelectedList] = useState<JSX.Element[]>([]);

  /**
   * Maps each selectedSeed entry to a SelectedItems card
   */
  function makeSelectedCards() {
    setSelectedList(
      selectedSeeds.map((obj) => (
        <SelectedItems
          seedsMap={props.seedsMap}
          seedInfo={obj}
          selectedSeeds={selectedSeeds}
          setSelectedSeeds={setSelectedSeeds}
        ></SelectedItems>
      ))
    );
  }

  /**
   * Creates the selected cards whenever the list of selected seeds is updated.
   */
  useEffect(() => {
    // console.log(props.)
    makeSelectedCards();
    //console.log(props.seedsMap);
    //console.log(selectedSeeds);
  }, [selectedSeeds]);

  /**
   * Allows users to continue if they have selected at least one seed.
   */
  useEffect(() => {
    const continueButton = document.getElementById("continue-button");
    if (selectedSeeds.length > 0) {
      if (continueButton) {
        continueButton.classList.add("toggle");
      }
    } else {
      if (continueButton) {
        continueButton.classList.remove("toggle");
      }
    }
  }, [selectedSeeds]);

  /**
   * Changes the background color upon load.
   */
  useEffect(() => {
    document.body.style.backgroundColor = "#335B79";
  }, []);
  const nav = useNavigate();

  return (
    <>
      <body>
        <main
          aria-label="Adjusting seed parameters page"
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
              onClick={() => nav("/duration")}
            >
              Continue
            </button>
          </nav>
          <div
            className="select-content"
            aria-label="Use the sliders to customize the range of each parameter"
          >
            <div className="search-container">
              {props.seedNames.map((seed) => (
                <div className="select-seed">
                  <div className="seed-title">
                    <h3>{seed}</h3>
                    <div className="selected-seed-container">
                      {selectedList.filter((selected: JSX.Element) => {
                        return (
                          selected.props.seedInfo[1] === seed.toLowerCase()
                        );
                      })}
                    </div>
                  </div>

                  <SearchBox
                    seedType={seed.toLowerCase()}
                    seedMap={props.seedsMap}
                    selectedSeeds={selectedSeeds}
                    setSelectedSeeds={setSelectedSeeds}
                  ></SearchBox>
                </div>
              ))}
            </div>
          </div>
        </main>
      </body>
    </>
  );
}
