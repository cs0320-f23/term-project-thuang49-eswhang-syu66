import { useEffect, useState } from "react";

interface prop {
    selectedSeeds: string[], 
    setSelectedSeeds: React.Dispatch<React.SetStateAction<string[]>>,

    seedMap: Map<String, String[]>,

    resultInfo: any;
}

export function ArtistResultCard(props: prop) {
    const[added ,setAdded] = useState("")
    useEffect(() => {
        setAdded("")
        console.log(props.selectedSeeds)
        console.log(props.seedMap)
    }, [props.resultInfo])

    function addArtist() {
        if (added == "") {
            props.setSelectedSeeds([... props.selectedSeeds, props.resultInfo.id])

            let existing: String[] | undefined = props.seedMap.get("artists")!;
            console.log("artists" in props.seedMap )
            if (existing !== undefined) {
                props.seedMap.set("artists", [...existing, props.resultInfo.id]);
            } else {
                props.seedMap.set("artists", [props.resultInfo.id]);
            }
            props.seedMap.set
            setAdded("-added")
        } else {
            props.setSelectedSeeds(props.selectedSeeds.filter(obj => obj != props.resultInfo.id))

            let existing = props.seedMap.get("artists");
            if ( existing !== undefined) {
                props.seedMap.set("artists", existing.filter(obj => obj!= props.resultInfo.id))
            }
            setAdded("")
        }
    }

    function returnImages() {
            if (props.resultInfo.images[0] == undefined) {
                return ""
            }
            return props.resultInfo.images[0].url
    }
    return (
        <div className = {"artist-result-card" + added} onClick = {addArtist}>
            <div style = {{display: "flex", alignItems:"center"}}>
                <img src = {returnImages()} style = {{width:"50px", height:"50px", marginRight: "10px"}} placeholder={props.resultInfo.name}/>
                <h4>{props.resultInfo.name}</h4>
            </div>

        </div>
        
    )

}
