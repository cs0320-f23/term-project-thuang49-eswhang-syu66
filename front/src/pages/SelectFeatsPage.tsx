import { useNavigate } from "react-router-dom";
import { Slider } from "../components/Slider";

interface sharedProps {
    featNames : string[], 
    setFeatNames : React.Dispatch<React.SetStateAction<string[]>>, 
    featsMap: Map<String, Number>
  }



export function SelectFeatsPage(props :sharedProps) {
  const nav = useNavigate()
    return (
        <>
          <body>
            <main className="container-fluid">
              <nav className="row flex-nowrap">
                <h2>Amplify</h2>
                <button onClick={() => nav("/select-seeds")}> → </button>
              </nav>
              <div style = {{justifySelf:"center"}}>
              {props.featNames.map(feat => 
              <div className="select-feat">
                <h2>{feat}</h2>
                <Slider featMap= {props.featsMap} feat = {feat}></Slider>
              </div>
              )}
              </div>
              
              {/* <Slider featList = {props.featNames} featName = {}></Slider> */}
            </main>
          </body>
        </>
      );
}