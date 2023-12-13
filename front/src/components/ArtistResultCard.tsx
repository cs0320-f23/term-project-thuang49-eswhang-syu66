import { useEffect } from "react";
import { artistResponse } from "../interfaces/artistResponse";

interface prop {
  selectedSeeds: string[][];
  setSelectedSeeds: React.Dispatch<React.SetStateAction<string[][]>>;
  seedMap: Map<string, string[]>;
  resultInfo: artistResponse;
}


/**
 * Defines the component to dislpay after searching for an artist
 * @param props of type prop: contains shared states listed above in the interface.
 * @returns a component containing artist information.
 */
export function ArtistResultCard(props: prop) {
  useEffect(() => {}, [props.resultInfo]);

  /**
   * Adds an artist and its information to all of the shared states. Also removes on double click.
   */
  function addArtist() {
    // adding
    if (
      !props.selectedSeeds.map((x) => x[0]).includes(props.resultInfo.id) &&
      props.selectedSeeds.length < 5
    ) {
      // updating the seedsMap
      const existing: string[] | undefined = props.seedMap.get("artists")!;
      console.log("artists" in props.seedMap);
      if (existing !== undefined) {
        props.seedMap.set("artists", [...existing, props.resultInfo.id]);
      } else {
        props.seedMap.set("artists", [props.resultInfo.id]);
      }

      // updating the selectedSeeds array
      props.setSelectedSeeds([
        ...props.selectedSeeds,
        [props.resultInfo.id, "artists", props.resultInfo.name, returnImages()],
      ]);
    } else {
      // updating the selectedSeeds array
      props.setSelectedSeeds(
        props.selectedSeeds.filter((obj) => !obj.includes(props.resultInfo.id))
      );

      // updating the seedsMap
      const existing = props.seedMap.get("artists");
      if (existing !== undefined) {
        props.seedMap.set(
          "artists",
          existing.filter((obj) => obj != props.resultInfo.id)
        );
      }
    }
  }

  /**
   * Extracts the image path from the artist response
   * @returns a string to the artist's image
   */
  function returnImages() {
    if (props.resultInfo.images[0] == undefined) {
      return "";
    }
    return props.resultInfo.images[0].url;
  }

  return (
    <div
      className={"artist-result-card result-card"}
      id={"artists" + props.resultInfo.id}
      onClick={addArtist}
    >
      <img src={returnImages()} placeholder={props.resultInfo.name} />
      <p>{props.resultInfo.name}</p>
    </div>
  );
}
