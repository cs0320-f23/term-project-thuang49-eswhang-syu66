
import { SelectButton } from "../components/SelectButton";
import "../css/App.css";
import { useNavigate } from "react-router-dom";

interface sharedProps {
  featNames : string[], 
  setFeatNames : React.Dispatch<React.SetStateAction<string[]>>, 

}
export function FeatsPage(props: sharedProps) {

  const paramNames : string[] = [
    "accousticness",
    "danceability",
    "duration",
    "energy",
    "instrumentalness",
    "key",
    "liveness",
    "loudness",
    "tempo",
    "valence"
]
const nav = useNavigate();
  return (
    
    <>
      <body>
        <main className="container-fluid">
          <nav className="row flex-nowrap">
            <a href = "/">
              <h2>Amplify</h2>
            </a>
            <button onClick={() => nav("/seeds")}> → </button>
          </nav>
          <h1>Parameters</h1>
          {paramNames.map(p => <SelectButton toAdd={p} list={props.featNames} listSetter={props.setFeatNames }></SelectButton>)}
        </main>
      </body>
    </>
  );
}
