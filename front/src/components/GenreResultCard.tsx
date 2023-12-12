import { genreResponse } from "./SearchBox";

interface prop {
  selectedSeeds: string[][];
  setSelectedSeeds: React.Dispatch<React.SetStateAction<string[][]>>;

  seedMap: Map<string, string[]>;

  resultInfo: genreResponse;
}

export function GenreResultCard(props: prop) {
  function addTrack() {
    if (
      !props.selectedSeeds.map((x) => x[0]).includes(props.resultInfo.data) &&
      props.selectedSeeds.length < 5
    ) {
      // selectedSeeds keeps track of the id, category, name and image
      // TODO: replace the fourth argument with a valid photo path.
      props.setSelectedSeeds([
        ...props.selectedSeeds,
        [props.resultInfo.data, "genres", props.resultInfo.data, ""],
      ]);

      //updating seeds map
      const existing: string[] | undefined = props.seedMap.get("genres")!;
      if (existing !== undefined) {
        props.seedMap.set("genres", [...existing, props.resultInfo.data]);
      } else {
        props.seedMap.set("genres", [props.resultInfo.data]);
      }
    } else {
      props.setSelectedSeeds(
        props.selectedSeeds.filter(
          (obj) => !obj.includes(props.resultInfo.data)
        )
      );
      const existing = props.seedMap.get("genres");
      if (existing !== undefined) {
        props.seedMap.set(
          "genres",
          existing.filter((obj) => obj != props.resultInfo.data)
        );
      }
    }
  }

  return (
    <div
      className={"track-result-card"}
      id={"genres" + props.resultInfo.data}
      onClick={addTrack}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={""}
          style={{ width: "50px", height: "50px", marginRight: "1rem" }}
        />
        <div>
          <h4>{props.resultInfo.data}</h4>
        </div>
      </div>
    </div>
  );
}
