import { useEffect, useState } from "react"
import { ArtistResultCard } from "./ArtistResultCard"
import { TrackResultCard } from "./TrackResultCard"

interface prop {
    seedType : string, // either artist or track
    seedMap: Map<String, String[]>

    selectedSeeds: string[][], 
    setSelectedSeeds: React.Dispatch<React.SetStateAction<string[][]>>
    
}


export function SearchBox(props: prop) {
    const[search, setSearch] = useState<string>("")

    const[searchResults, setSearchResults] = useState<any>([])

    // edit this to allow for songs as well.
    async function fetchData() {
        try {
            let url = `http://localhost:3000/search?${props.seedType}=${encodeURIComponent(search)}`
            console.log(url)
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
    
          const data = await response.json();

          if ('data' in data) {
            setSearchResults(data.data)
          } else {
            console.error("No data within the response?? shouldn't happen.")
          }
        } catch (error) {
          console.error('Error during fetch:');
        }
      }
    
      useEffect(() => {
        console.log(search);
        if (search != "") {
            fetchData();
        }
        console.log(searchResults)
      }, [search]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        
        <div className = "search-box">
            <input className = "search-bar" type = "search" placeholder={props.seedType} onChange = {handleChange}></input>
            {searchResults.map((res : any) => { 
                if ("type" in res) {
                    if (res.type == "artist") {
                        return <ArtistResultCard selectedSeeds={props.selectedSeeds} setSelectedSeeds={props.setSelectedSeeds} resultInfo={res} seedMap={props.seedMap}></ArtistResultCard>
                    } else if (res.type == "track") {
                        return <TrackResultCard selectedSeeds={props.selectedSeeds} setSelectedSeeds={props.setSelectedSeeds} resultInfo={res} seedMap = {props.seedMap}></TrackResultCard>
                    }
                } else {
                    console.error("could not find type in the response object.")
                }})}
        </div>
    )
}