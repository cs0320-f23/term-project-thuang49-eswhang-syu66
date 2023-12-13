import { useEffect } from "react";
import { trackResponse } from "../interfaces/trackResponse";

interface prop {
  selectedSeeds: string[][];
  setSelectedSeeds: React.Dispatch<React.SetStateAction<string[][]>>;

  seedMap: Map<string, string[]>;

  resultInfo: trackResponse;
}



/**
 * This component defines the drop down search results from searching for a track
 * @param props of type prop is defined by the interface above.
 * @returns a component containing information about a given track.
 */
export function TrackResultCard(props: prop) {
  useEffect(() => {}, [props.resultInfo]);

  /**
   * This function adds a track to the seedsMap in addition to the seeds list.
   */
  function addTrack() {
    if (
      !props.selectedSeeds.map((x) => x[0]).includes(props.resultInfo.id) &&
      props.selectedSeeds.length < 5
    ) {
      // selectedSeeds keeps track of the id, category, name and image
      props.setSelectedSeeds([
        ...props.selectedSeeds,
        [props.resultInfo.id, "tracks", props.resultInfo.name, returnImages()],
      ]);

      //updating seeds map
      const existing: string[] | undefined = props.seedMap.get("tracks")!;
      if (existing !== undefined) {
        props.seedMap.set("tracks", [...existing, props.resultInfo.id]);
      } else {
        props.seedMap.set("tracks", [props.resultInfo.id]);
      }
    } else {
      props.setSelectedSeeds(
        props.selectedSeeds.filter((obj) => !obj.includes(props.resultInfo.id))
      );
      const existing = props.seedMap.get("tracks");
      if (existing !== undefined) {
        props.seedMap.set(
          "tracks",
          existing.filter((obj) => obj != props.resultInfo.id)
        );
      }
    }
  }

  /**
   * Extracts the artis information from a given track. must loop through all artists
   * @returns a string containing all artists
   */
  function extractArtists() {
    let retVal = "";
    if ("artists" in props.resultInfo) {
      for (let i = 0; i < props.resultInfo.artists.length; i++) {
        retVal += props.resultInfo.artists[i].name;
        if (i != props.resultInfo.artists.length - 1) {
          retVal += ", ";
        }
      }
    } else {
      retVal += "No Artists Found";
    }

    return retVal;
  }

  /**
   * Extracts the duration of a track.
   * @returns A string representing the time duration of the track
   */
  function extractTime() {
    let retVal = "";
    if ("duration_ms" in props.resultInfo) {
      const secs = props.resultInfo.duration_ms / 1000;

      const minutes = Math.floor(secs / 60);
      const seconds = Math.floor(secs % 60);

      retVal += minutes.toString() + ":";

      if (seconds < 10) {
        retVal += "0";
      }
      retVal += seconds.toString();
    } else {
      retVal += "-:--";
    }
    return retVal;
  }

  /**
   * Extracs the image source url from a track.
   * @returns a string path to the image.
   */
  function returnImages() {
    if (
      props.resultInfo.album != undefined &&
      props.resultInfo.album.images[0] != undefined
    ) {
      console.log(props.resultInfo.album.images[0].url);
      return props.resultInfo.album.images[0].url;
    } else {
      return "";
    }
  }
  return (
    <div
      className={"track-result-card result-card"}
      id={"tracks" + props.resultInfo.id}
      onClick={addTrack}
    >
      <img src={returnImages()} />
      <div className="track-metadata">
        <p>{props.resultInfo.name}</p>
        <div className="artist-names">{extractArtists().toString()}</div>
      </div>
      <div className="track-time">{extractTime()}</div>
    </div>
  );
}
