import { useNavigate } from "react-router-dom";
import { SelectButton } from "../components/SelectButton";
import "../css/App.css";
import { InitialAuth } from "../endpoints/InitialAuth";

interface sharedProps {
  seedNames: string[], 
  setSeedNames: React.Dispatch<React.SetStateAction<string[]>>,
}
export function SeedsPage(props: sharedProps) {
  const seedNames : string[] = ["artists", "genres", "tracks"]

  const nav = useNavigate()

  return (
    <>
      <body>
        <main className="container-fluid">
          <nav className="row flex-nowrap">
            <h2>Amplify</h2>
            <button onClick={() => nav("/select-feats")}> → </button>
          </nav>
          {seedNames.map(seed => <SelectButton list = {props.seedNames} listSetter={props.setSeedNames} toAdd={seed}></SelectButton>)}
        </main>
      </body>
    </>
  );
}
