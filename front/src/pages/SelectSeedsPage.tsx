import { useEffect, useState } from "react";
import { SearchBox } from "../components/SearchBox";
import { SelectedItems } from "../components/SelectedItems";
import { useNavigate } from "react-router-dom";

interface sharedProps {
    seedNames: string[], 
    setSeedNames: React.Dispatch<React.SetStateAction<string[]>>,
    seedsMap: Map<String, String[]>
  }

export function SelectSeedsPage(props :sharedProps) {

  //selected seeds is an array of arrays where each inner array has the following elements:
  // [0] = id (of the track or artist)
  // [1] = category (indicating track or artit)
  // [2] = name 
  // [3] = image path
  const [selectedSeeds, setSelectedSeeds] = useState<string[][]>([])


  const [selectedList, setSelectedList] = useState<JSX.Element[]>([])
  
  function makeSelectedCards() {
    setSelectedList(selectedSeeds.map(obj => <SelectedItems seedsMap = {props.seedsMap} seedInfo={obj} selectedSeeds={selectedSeeds} setSelectedSeeds={setSelectedSeeds}></SelectedItems>))
  }
  useEffect(() => {
    // console.log(props.)
    makeSelectedCards()
    console.log(props.seedsMap)
    console.log(selectedSeeds)
  }, [selectedSeeds])

  const nav = useNavigate();
    return (
        <>
          <body>
            <main className="container-fluid">
              <nav className="row flex-nowrap">
                <a href = "/">
                <h2>Amplify</h2>
                </a>
                <button onClick={() => nav("/select-seeds")}> → </button>
              </nav>
              <div className="search-container">
              {props.seedNames.map(seed => <SearchBox seedType={seed} seedMap={props.seedsMap} selectedSeeds={selectedSeeds} setSelectedSeeds={setSelectedSeeds}></SearchBox>)}
              </div>
              <div className = "selected-seed-container">
                {selectedList}
              </div>
            </main>
          </body>
        </>
      );
}