import "../css/App.css";
import { InitialAuth } from "../endpoints/InitialAuth";

interface sharedProps {
  featNames : string[], 
  setFeatNames : React.Dispatch<React.SetStateAction<never[]>>, 

}
export function FeatsPage(props: sharedProps) {
  return (
    <>
      <body>
        <main className="container-fluid">
          <nav className="row flex-nowrap">
            <h2>Amplify</h2>
          </nav>
        </main>
      </body>
    </>
  );
}
