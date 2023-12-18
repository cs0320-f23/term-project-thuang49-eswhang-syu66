import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { FeatsPage } from "./pages/FeatsPage";
import { ResultsPage } from "./pages/ResultsPage";
import { useState } from "react";
import { SeedsPage } from "./pages/SeedsPage";
import { SelectFeatsPage } from "./pages/SelectFeatsPage";
import { SelectSeedsPage } from "./pages/SelectSeedsPage";
import { DurationPage } from "./pages/DurationPage";
import { trackResponse } from "./interfaces/trackResponse";

function App() {
  const [featNames, setFeatNames] = useState<string[]>([]);
  const [seedNames, setSeedNames] = useState<string[]>([]);

  // a map from featMax or featMin to number
  const [featsMap] = useState<Map<string, number>>(new Map<string, number>());
  const [seedsMap] = useState<Map<string, string[]>>(
    new Map<string, string[]>()
  );

  // props used for the results object:
  const [returnedTracks, setReturnedTracks] = useState<trackResponse[]>([]);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [noSongs, setNoSongs] = useState<number>(0);

  const [authToken, setAuthToken] = useState<string>("");

  return (
    <Router basename="">
      <Routes>
        {/* make a loading page, pass in both feats maps and seeds maps. also pass in a songs state to have the returned songs update here.*/}

        {/* make a duration page, pass in the feats map*/}

        <Route
          path="/duration"
          element={
            <DurationPage
              featsMap={featsMap}
              seedMap={seedsMap}
              returnedTracks={returnedTracks}
              setReturnedTracks={setReturnedTracks}
              totalTime={totalTime}
              setTotalTime={setTotalTime}
              noSongs={noSongs}
              setNoSongs={setNoSongs}
            ></DurationPage>
          }
        />

        <Route
          path="/select-seeds"
          element={
            <SelectSeedsPage
              seedNames={seedNames}
              setSeedNames={setSeedNames}
              seedsMap={seedsMap}
            ></SelectSeedsPage>
          }
        />

        <Route
          path="/select-feats"
          element={
            <SelectFeatsPage
              featNames={featNames}
              setFeatNames={setFeatNames}
              featsMap={featsMap}
            ></SelectFeatsPage>
          }
        />
        <Route
          path="/feats"
          element={
            <FeatsPage
              featNames={featNames}
              setFeatNames={setFeatNames}
              authToken={authToken}
              setAuthToken={setAuthToken}
            ></FeatsPage>
          }
        />
        <Route
          path="/seeds"
          element={
            <SeedsPage
              seedNames={seedNames}
              setSeedNames={setSeedNames}
            ></SeedsPage>
          }
        />
        <Route
          path="/results"
          element={
            <ResultsPage
              authToken={authToken}
              returnedTracks={returnedTracks}
              setReturnedTracks={setReturnedTracks}
              totalTime={totalTime}
              setTotalTime={setTotalTime}
              noSongs={noSongs}
              setNoSongs={setNoSongs}
            ></ResultsPage>
          }
        />
        <Route path="/" element={<HomePage></HomePage>} />
      </Routes>
    </Router>
  );
}

export default App;
