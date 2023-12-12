import { useEffect, useState } from "react";
import { ArtistResultCard, artistResponse } from "./ArtistResultCard";
import { TrackResultCard, trackResponse } from "./TrackResultCard";
import { RiSearchLine } from "../../node_modules/react-icons/ri";
import { GenreResultCard } from "./GenreResultCard";

interface prop {
  seedType: string; // either artist or track
  seedMap: Map<string, string[]>;

  selectedSeeds: string[][];
  setSelectedSeeds: React.Dispatch<React.SetStateAction<string[][]>>;
}

export interface genreResponse {
  type: string;
  data: string;
}
/**
 * The component responsible for creading search boxes and dropdown
 * search options
 * @param props the interface as defined above
 * @returns html component.
 */
export function SearchBox(props: prop) {
  const [search, setSearch] = useState<string>("");
  const [genres, setGenres] = useState<string[]>([]);

  const [searchResults, setSearchResults] = useState<
    artistResponse[] | trackResponse[] | genreResponse[]
  >([]);

  /**
   * Responsible for fetching song or track data
   */
  async function fetchData() {
    if (props.seedType == "artists" || props.seedType == "tracks") {
      try {
        const url = `http://localhost:3000/search?${
          props.seedType
        }=${encodeURIComponent(search)}`;
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
    } else {
      let res: genreResponse[] = [];
      for (let i = 0; i < genres.length; i++) {
        if (genres[i].startsWith(search)) {
          res = [...res, { type: "genre", data: genres[i] }];
        }
        if (res.length == 5) {
          break;
        }
      }

      setSearchResults(res);
    }
  }

  async function fetchGenres() {
    try {
      const url = `http://localhost:3000/get_genres`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if ("data" in data) {
        setGenres(data.data.genres);
      } else {
        console.error("Genres could not be fetched??");
      }
    } catch (error) {
      console.error("Error during fetch:");
    }
  }

  /**
   * re-searches everytime the textbox is udpated.
   */
  useEffect(() => {
    if (search != "") {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [search]);

  useEffect(() => {
    console.log(props.seedType);
    if (props.seedType === "genres") {
      fetchGenres();
    }
  }, []);

  // updater function
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <div className="search-box">
      <RiSearchLine className="search-icon" />
      <input
        className="search-bar"
        type="search"
        placeholder={"Search for " + props.seedType.toLowerCase() + "..."}
        onChange={handleChange}
      ></input>

      {searchResults.map(
        (res: artistResponse | trackResponse | genreResponse) => {
          console.log(res);
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
            } else if (res.type == "genre") {
              res = res as genreResponse;
              return (
                <GenreResultCard
                  selectedSeeds={props.selectedSeeds}
                  setSelectedSeeds={props.setSelectedSeeds}
                  resultInfo={res}
                  seedMap={props.seedMap}
                ></GenreResultCard>
              );
            }
          } else {
            console.error("could not find type in the response object.");
          }
        }
      )}
    </div>
  );
}
