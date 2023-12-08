import { useEffect, useState } from "react";
import { SearchBox } from "../components/SearchBox";

interface sharedProps {
    seedNames: string[], 
    setSeedNames: React.Dispatch<React.SetStateAction<string[]>>,
    seedsMap: Map<String, String[]>
  }

export function SelectSeedsPage(props :sharedProps) {
  const [selectedSeeds, setSelectedSeeds] = useState<string[]>([])
  useEffect(() => {
    // console.log(props.)
  })
    return (
        <>
          <body>
            <main className="container-fluid">
              <nav className="row flex-nowrap">
                <a href = "/">
                <h2>Amplify</h2>
                </a>
                
              </nav>
              <div className="search-container">
              {props.seedNames.map(seed => <SearchBox seedType={seed} seedMap={props.seedsMap} selectedSeeds={selectedSeeds} setSelectedSeeds={setSelectedSeeds}></SearchBox>)}

              </div>
            </main>
          </body>
        </>
      );
}