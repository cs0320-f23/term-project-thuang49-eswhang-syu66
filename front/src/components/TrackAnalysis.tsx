import { featuresResponse } from "../interfaces/featuresResponse";
import { trackResponse } from "../interfaces/trackResponse";

interface sharedProps {
  trackData: trackResponse | undefined;
  trackFeatures: featuresResponse | undefined;
}
export function TrackAnalysis(props: sharedProps) {
  function returnImages() {
    if (
      props.trackData != undefined &&
      props.trackData.album.images[0] != undefined
    ) {
      console.log(props.trackData.album.images[0].url);
      return props.trackData.album.images[0].url;
    } else {
      return "";
    }
  }
  if (props.trackData && props.trackFeatures) {
    return (
      <div className="track-analysis">
        <img src={returnImages()} />
        <h4>{props.trackData.name}</h4>
      </div>
    );
  } else {
    return <div>something went wrong</div>;
  }
}
