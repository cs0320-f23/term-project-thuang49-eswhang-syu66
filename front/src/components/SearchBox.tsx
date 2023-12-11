import { useEffect, useState } from "react";
import { ArtistResultCard, artistResponse } from "./ArtistResultCard";
import { TrackResultCard, trackResponse } from "./TrackResultCard";
import { RiSearchLine } from "../../node_modules/react-icons/ri";

interface prop {
  seedType: string; // either artist or track
  seedMap: Map<string, string[]>;

  selectedSeeds: string[][];
  setSelectedSeeds: React.Dispatch<React.SetStateAction<string[][]>>;
}

/**
 * The component responsible for creading search boxes and dropdown 
 * search options
 * @param props the interface as defined above
 * @returns html component.
 */
export function SearchBox(props: prop) {
  const [search, setSearch] = useState<string>("");

  const [searchResults, setSearchResults] = useState<
    artistResponse[] | trackResponse[]
  >([]);

  /**
   * Responsible for fetching song or track data
   */
  async function fetchData() {
    try {
      const url = `http://localhost:3000/search?${props.seedType}=${encodeURIComponent(search)}`;
      console.log(url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if ("data" in data) {
        setSearchResults(data.data);
      } else {
        console.error("No data within the response?? shouldn't happen.");
      }
    } catch (error) {
      console.error("Error during fetch:");
    }
  }

  /**
   * re-searches everytime the textbox is udpated.
   */
  useEffect(() => {
    console.log(search);
    if (search != "") {
      fetchData();
    } else {
      setSearchResults([]);
    }
    console.log(searchResults);
  }, [search]);

  // updater function
    function handleChange(event: React.ChangeEvent<HTMLInputElement>)  {
        setSearch(event.target.value);
    };

  return (
    <div className="search-box">
      <RiSearchLine className="search-icon" />
      <input
        className="search-bar"
        type="search"
        placeholder={"Search for " + props.seedType.toLowerCase() + "..."}
        onChange={handleChange}
      ></input>

      {searchResults.map((res: artistResponse | trackResponse) => {
        if ("type" in res) {
          if (res.type == "artist") {
            res = res as artistResponse;
            return (
              <ArtistResultCard
                selectedSeeds={props.selectedSeeds}
                setSelectedSeeds={props.setSelectedSeeds}
                resultInfo={res}
                seedMap={props.seedMap}
              ></ArtistResultCard>
            );
          } else if (res.type == "track") {
            res = res as trackResponse;
            return (
              <TrackResultCard
                selectedSeeds={props.selectedSeeds}
                setSelectedSeeds={props.setSelectedSeeds}
                resultInfo={res}
                seedMap={props.seedMap}
              ></TrackResultCard>
            );
          }
        } else {
          console.error("could not find type in the response object.");
        }
      })}
    </div>
  );
}
