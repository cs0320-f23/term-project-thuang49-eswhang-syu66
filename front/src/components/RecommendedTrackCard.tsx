import { useEffect } from "react";
import { featuresResponse } from "../interfaces/featuresResponse";
import { trackResponse } from "../interfaces/trackResponse";

interface prop {
  resultInfo: trackResponse;
  idFeatureMap: Map<string, featuresResponse>;
  currFeature: featuresResponse | undefined;
  setCurrFeatures: React.Dispatch<
    React.SetStateAction<featuresResponse | undefined>
  >;
  currId: string;
  setCurrId: React.Dispatch<React.SetStateAction<string>>;
  currSong: trackResponse | undefined;
  setCurrSong: React.Dispatch<React.SetStateAction<trackResponse | undefined>>;
  number: number;
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
   * Extracts the image source url from a track.
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

  // function setStates(id: string) {
  //   props.setCurrId(id);
  //   props.setCurrSong(props.resultInfo);

  //   const toBeId = props.idFeatureMap.get(id);
  //   if (toBeId != undefined && props.setCurrFeatures != undefined) {
  //     props.setCurrFeatures(toBeId);
  //   }
  // }

  return (
    <div
      className={"result-page-track-card"}
      id={"tracks" + props.resultInfo.id}
      // onMouseOver={() => setStates(props.resultInfo.id)}
    >
      <div className="track-data">
        <div className="track-number">
          {props.number < 10 ? "0" + props.number : props.number}
        </div>
        <img className="track-img" src={returnImages()} />
        <div className="track-names">
          <p>{props.resultInfo.name}</p>
          <div className="artist-names">{extractArtists().toString()}</div>
        </div>
      </div>
      <div className="track-length">{extractTime()}</div>
    </div>
  );
}
