
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {FeatsPage} from './pages/FeatsPage';
import { ResultsPage } from './pages/ResultsPage';
import { useState } from 'react';
import { SeedsPage } from './pages/SeedsPage';
import { SelectFeatsPage } from './pages/SelectFeatsPage';
import { SelectSeedsPage } from './pages/SelectSeedsPage';
import { DurationPage } from './pages/DurationsPage';


// export interface sharedProps {
//   featList : string[], 
//   setFeatList : React.Dispatch<React.SetStateAction<never[]>>, 

//   seeds: string[], 
//   setSeeds: React.Dispatch<React.SetStateAction<never[]>>,
// }

function App() {

  const [featNames, setFeatNames] = useState<string[]>([])
  const [seedNames, setSeedNames] = useState<string[]>([])

  // a map from featMax or featMin to number
  const [featsMap] = useState<Map<String, Number>>(new Map<String, Number>())
  const [seedsMap] = useState<Map<String, String[]>>(new Map<String, String[]>())

	return (
    <Router basename="">
      <Routes>

        {/* make a loading page, pass in both feats maps and seeds maps. also pass in a songs state to have the returned songs update here.*/}

        {/* make a duration page, pass in the feats map*/}

        <Route path="/duration" element = 
          {<DurationPage featsMap={featsMap} seedMap = {seedsMap}></DurationPage>}
        /> 

        <Route path="/select-seeds" element = 
          {<SelectSeedsPage seedNames = {seedNames} setSeedNames= {setSeedNames} 
                      seedsMap = {seedsMap}></SelectSeedsPage>}
        /> 

        <Route path="/select-feats" element = 
          {<SelectFeatsPage featNames = {featNames} setFeatNames = {setFeatNames}
                            featsMap = {featsMap}></SelectFeatsPage>}
        /> 
        <Route path="/feats" element = {<FeatsPage featNames = {featNames} setFeatNames = {setFeatNames}></FeatsPage>}/> 
        <Route path="/seeds" element = {<SeedsPage seedNames = {seedNames} setSeedNames= {setSeedNames}></SeedsPage>}/> 
        <Route path="/results" element = {<ResultsPage></ResultsPage>}/> 
        <Route path="/" element = {<HomePage></HomePage>}/> 
      </Routes>
    </Router>
          );
}

export default App;