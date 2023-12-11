import { useNavigate } from "react-router-dom";
import "../css/App.css";
import { useEffect, useState } from "react";

interface sharedProps {
    seedMap: Map<String, String[]>
    featsMap: Map<String, Number>
}

/**
 * the component in charge of the duration page. 
 * @param props shared props as defined above.
 * @returns the html/jselements required for rendering the page.
 */
export function DurationPage(props: sharedProps) {
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [mode, setMode] = useState<string>("duration");
  const nav = useNavigate()

  useEffect(() => {
  }, [totalDuration, mode])

  // an updater function
  function updateMode(str: string) {
    setMode(str)
  }

  /**
   * The function responsible for assembling the query to be passed to get_recommendations
   */
  async function submitQuery() {

    const baseurl = "http://localhost:3000/get_recommendations?"
    let url = ""

    // this loops through the seedMap and adds all of the seeds to the query
    for (const [key, value] of props.seedMap) {
        console.log(key)
        let seed = `seed_${key}=`
        if (value.length > 0) {
            for (let i = 0; i < value.length; i ++) {
                seed += `${value[i]}`
                if (i != value.length-1 ) { 
                    seed += ","
                }
            }
            url += `${seed}&`
            console.log(props.seedMap)
        }
      }

      // looping through the featsmap and adding all of the seeds to the query.
      for (const [key, value] of props.featsMap) {
        url += `${key}=${value}&`
      }

      // performing query.
      let duration = `${mode}=${totalDuration}`
      const finalQuery = await fetch(baseurl + url + duration).then(res => res.json())

      console.log(finalQuery)
      console.log(baseurl + url + duration)
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

/**
 * The component responsible for number selection (inputting duration or no. tracks)
 * @param props shared props, specified in the interface above.
 * @returns the number inputs
 */
function NumberSelector(props: prop) {
    const [val, setVal] = useState<number>(30);
    const [hour, setHour] = useState<number>(0);
    // const [comp, setComp] = useState<JSX.Element>(renderComp());

    useEffect(() => {
        console.log(val)
        if (props.mode == "duration") {
            let totalSec = 0;
            totalSec += hour * 60 * 60
            totalSec += val * 60
            let msDuration = totalSec * 1000
            props.setTotalDuration(msDuration)
        } else if (props.mode == "number") {
            props.setTotalDuration(val)
        }
    }, [val, hour, props.mode])

    useEffect(() => {
        setVal(30)
        setHour(0)
        if (props.mode == "duration") {
            let totalSec = 0;
            totalSec += hour * 60 * 60
            totalSec += val * 60
            let msDuration = totalSec * 1000
            props.setTotalDuration(msDuration)
        } else if (props.mode == "number") {
            props.setTotalDuration(val)
        }
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
                        return changeVal(event, setHour)}} max = "4" value = {hour}></input>
                    <input type = "number" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        return changeVal(event, setVal)}} max = "59" value = {val}></input>  
                </div>
            )
        } else if (props.mode == "number") {
            return (   
                <div>
                    <input type = "number" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        return changeVal(event, setVal)}} max = "100" value = {val}></input>  
                </div>)
        } else {
            console.error("mode not duration or number")
            return <p>error</p>
        }
    }
    return renderComp()

}
