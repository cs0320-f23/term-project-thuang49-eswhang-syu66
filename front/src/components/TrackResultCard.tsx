import { useEffect, useState } from "react";

interface prop {
    selectedSeeds: string[], 
    setSelectedSeeds: React.Dispatch<React.SetStateAction<string[]>>,

    seedMap: Map<String, String[]>,

    resultInfo: any;
}

export function TrackResultCard(props: prop) {
    const[added ,setAdded] = useState("")
    useEffect(() => {
        setAdded("")
        console.log(props.selectedSeeds)
        console.log(props.resultInfo)
    } ,[props.resultInfo])

    function addTrack() {
        if (added == "") {
            props.setSelectedSeeds([... props.selectedSeeds, props.resultInfo.id])
            let existing: String[] | undefined = props.seedMap.get("tracks")!;
            if (existing !== undefined) {
                props.seedMap.set("tracks", [...existing, props.resultInfo.id]);
            } else {
                props.seedMap.set("tracks", [props.resultInfo.id]);
            }
            setAdded("-added")

        } else {
            props.setSelectedSeeds(props.selectedSeeds.filter(obj => obj != props.resultInfo.id))
            let existing = props.seedMap.get("tracks");
            if ( existing !== undefined) {
                props.seedMap.set("tracks", existing.filter(obj => obj!= props.resultInfo.id))
            }
            setAdded("")
        }
    }

    function extractArtists() {
        let retVal = ""
        if ('artists' in props.resultInfo) {
            for (let i = 0; i < props.resultInfo.artists.length; i ++) {
                retVal += props.resultInfo.artists[i].name 
                if (i != props.resultInfo.artists.length - 1) {
                    retVal += ", "
                }
            }
        } else  {
            retVal += "No Artists Found"
        }

        return retVal
    }

    function extractTime() {
        let retVal = ""
        if ("duration_ms" in props.resultInfo){
            const secs = props.resultInfo.duration_ms/1000

            let minutes = Math.floor(secs/60)
            let seconds = Math.floor(secs % 60);

            // if (minutes < 10) {
            //     retVal += "0" 
            // } 
            retVal += minutes.toString() + ":"

            if (seconds < 10) {
                retVal += "0"
            }
            retVal += seconds.toString()
        } else {
            retVal += "-:--"
        }
        return retVal
    }

    function returnImages() {
        if (props.resultInfo.album != undefined && props.resultInfo.album.images[0] != undefined) {
            console.log(props.resultInfo.album.images[0].url)
            return props.resultInfo.album.images[0].url
        } else  {
            return ""
        }
    }
    return (
        <div className = {"track-result-card" + added} onClick = {addTrack}>
            <div style = {{display: "flex", alignItems:"center"}}>
                <img src = {returnImages()} style = {{width:"50px", height:"50px", marginRight: "1rem"}}/>
                <div>
                    <h4>{props.resultInfo.name}</h4>
                    <div className = "artist-names">{extractArtists().toString()}</div>
                </div>
            </div>
            <div>
                {extractTime()}
            </div>
        </div>
        
    )

}
