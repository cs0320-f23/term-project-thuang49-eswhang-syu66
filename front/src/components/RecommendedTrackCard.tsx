import { useEffect } from "react";
import { trackResponse } from "./TrackResultCard";

interface prop {
  resultInfo: trackResponse;
}
/**
 * This component defines the drop down search results from searching for a track
 * @param props of type prop is defined by the interface above.
 * @returns a component containing information about a given track.
 */
export function RecommendedTrackCard(props: prop) {
  useEffect(() => {}, [props.resultInfo]);

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
    <div className={"track-result-card"} id={"tracks" + props.resultInfo.id}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={returnImages()}
          style={{ width: "50px", height: "50px", marginRight: "1rem" }}
        />
        <div>
          <h4>{props.resultInfo.name}</h4>
          <div className="artist-names">{extractArtists().toString()}</div>
        </div>
      </div>
      <div>{extractTime()}</div>
    </div>
  );
}
