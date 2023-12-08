import { useEffect } from "react";
import { SearchBox } from "../components/SearchBox";

interface sharedProps {
    seedNames: string[], 
    setSeedNames: React.Dispatch<React.SetStateAction<string[]>>,
    seedsMap: Map<String, String>
  }

export function SelectSeedsPage(props :sharedProps) {
  useEffect(() => {
    // console.log(props.)
  })
    return (
        <>
          <body>
            <main className="container-fluid">
              <nav className="row flex-nowrap">
                <h2>Amplify</h2>
              </nav>
              <SearchBox></SearchBox>
            </main>
          </body>
        </>
      );
}