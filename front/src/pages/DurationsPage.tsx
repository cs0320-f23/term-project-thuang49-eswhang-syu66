import { useNavigate } from "react-router-dom";
import "../css/App.css";
import { useEffect, useState } from "react";

interface sharedProps {
    seedMap: Map<String, String[]>
    featsMap: Map<String, Number>
}
export function DurationPage(props: sharedProps) {
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [mode, setMode] = useState<string>("duration");
  const nav = useNavigate()

  useEffect(() => {
    console.log(totalDuration)
    console.log(mode)
  }, [totalDuration, mode])


  function updateMode(str: string) {
    setMode(str)
  }

  async function submitQuery() {

    console.log(props.seedMap)

    for (const key in props.seedMap.keys()) {
        console.log(key)
    }
    
    // props.seedMap
    const baseurl = "http://localhost:3000/get_recommendations?"

    let url = ""
    for (const [key, value] of props.seedMap) {
        console.log(key)
        let seed = `seed_${key}=`
        if (value.length > 0) {
            for (let i = 0; i < value.length; i ++) {
                seed += `${value[i]}`
                // if (i != value.length-1 ) { seed += ","}
                if (i != value.length-1 ) { 
                    seed += ","
                }
            }
            url += `${seed}&`
            console.log(props.seedMap)
        }
      }

      //props.featsMap
      for (const [key, value] of props.featsMap) {
        url += `${key}=${value}&`
      }

      const finalQuery = await fetch(baseurl + url).then(res => res.json())

      console.log(finalQuery)
      console.log(baseurl + url)
    // nav('/results')
  }
  return (
    <>
      <body>
        <main className="container-fluid">
          <nav className="row flex-nowrap">
            <a href = "/">
              <h2>Amplify</h2>
            </a>
            <button onClick={submitQuery}> → </button>
          </nav>
          <div>
            <div>
                <div>
                    <input type="radio" id="duration" name="drone" value="duration" onClick = {() => {updateMode("duration")}} checked = {mode ==="duration"}/>
                        <label htmlFor="duration">total duration</label>
                </div>
                <div>
                    <input type="radio" id="number" name="drone" value="number" onClick = {() => {updateMode("number")}} checked = {mode ==="number"}/>
                        <label htmlFor="number">no. songs</label>
                </div>

            </div>

            <NumberSelector totalDuration={totalDuration} setTotalDuration={setTotalDuration}
            setMode={setMode} mode = {mode}></NumberSelector>
          </div>
        </main>
      </body>
    </>
  );
}

interface prop {
    totalDuration: number
    setTotalDuration: React.Dispatch<React.SetStateAction<number>>

    mode: string
    setMode: React.Dispatch<React.SetStateAction<string>>
}

function NumberSelector(props: prop) {
    const [val, setVal] = useState<number>(0);
    const [hour, setHour] = useState<number>(0);
    // const [comp, setComp] = useState<JSX.Element>(renderComp());

    useEffect(() => {
        if (props.mode == "duration") {
            let totalSec = 0;
            totalSec += hour * 60 * 60
            totalSec += val * 60
            let msDuration = totalSec * 1000
            props.setTotalDuration(msDuration)
        } else if (props.mode == "number") {
            props.setTotalDuration(val)
        }
    }, [val, hour])

    useEffect(() => {
        setVal(0)
        setHour(0)
        props.setTotalDuration(0)
        // setComp(renderComp())
    }, [props.mode])

    function changeVal(event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>) {
            if (!isNaN(Number(event.target.value))) {
                setter(Number(event.target.value))
            }
    }

    function renderComp() {
        if (props.mode == "duration") {
            return (
                <div>
                    <input type = "number" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        return changeVal(event, setHour)}} max = "4"></input>
                    <input type = "number" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        return changeVal(event, setVal)}} max = "59"></input>  
                </div>
            )
        } else if (props.mode == "number") {
            return (   
                <div>
                    <input type = "number" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        return changeVal(event, setVal)}} max = "100"></input>  
                </div>)
        } else {
            console.error("mode not duration or number")
            return <p>error</p>
        }
    }
    return renderComp()

}
