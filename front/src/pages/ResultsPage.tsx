import { useEffect, useState } from "react";
import { RecommendedTrackCard } from "../components/RecommendedTrackCard";
import { trackResponse } from "../interfaces/trackResponse";
import { featuresResponse } from "../interfaces/featuresResponse";
import { TrackAnalysis } from "../components/TrackAnalysis";

interface sharedProps {
  returnedTracks: trackResponse[];
  setReturnedTracks: React.Dispatch<React.SetStateAction<trackResponse[]>>;

  totalTime: number;
  setTotalTime: React.Dispatch<React.SetStateAction<number>>;

  noSongs: number;
  setNoSongs: React.Dispatch<React.SetStateAction<number>>;

  authToken: string;
}

export function ResultsPage(props: sharedProps) {
  const [idFeatureMap] = useState<Map<string, featuresResponse>>(
    new Map<string, featuresResponse>()
  );
  const [currId, setCurrId] = useState<string>("");
  const [currFeatures, setCurrFeatures] = useState<
    featuresResponse | undefined
  >();
  const [currSong, setCurrSong] = useState<trackResponse | undefined>();

  async function createPlaylist(authToken: string) {
    let url = "http://localhost:3000/generate_playlist?";
    url += `${"userToken"}=${authToken}&`;
    url += `songs=${props.returnedTracks.map((track) => track.uri).join(",")}`;
    console.log(url);
    const genPlaylist = await fetch(url).then((res) => res.json());

    if (genPlaylist.status === "success") {
      console.log("successfully addded to library");
    } else {
      console.error("error occurred in adding to library");
    }
  }

  async function analyzeTracks() {
    let url = "http://localhost:3000/analyze_tracks?";
    url += `ids=${props.returnedTracks.map((track) => track.id).join(",")}`;

    const genPlaylist = await fetch(url).then((res) => res.json());

    if (genPlaylist.status === "success") {
      console.log("successfully analyzed");

      const feats: featuresResponse[] = genPlaylist.data;

      if (feats != undefined) {
        for (let i = 0; i < genPlaylist.data.length; i++) {
          if (i == 0) {
            setCurrFeatures(feats[i]);
            setCurrSong(
              props.returnedTracks.filter((x) => x.id === feats[i].id)[0]
            );
          }
          idFeatureMap.set(feats[i].id, feats[i]);
        }
      } else {
        console.error("malformed response produced by analyze_tracks endpoint");
      }
    } else {
      console.error("error occurred in adding to library");
    }

    console.log(idFeatureMap);
  }

  function convertToTime(durationMs: number) {
    let seconds = durationMs / 1000;

    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    // Calculate remaining minutes and seconds
    minutes %= 60;
    seconds %= 60;

    let returnTime = ``;
    if (hours < 10) {
      returnTime += "0";
    }
    returnTime += hours + ":";
    if (minutes < 10) {
      returnTime += "0";
    }
    returnTime += minutes;

    return returnTime;
  }

  useEffect(() => {
    const continueButton = document.getElementById("continue-button");
    if (props.authToken === "") {
      if (continueButton) {
        continueButton.classList.add("toggle");
      }
    } else {
      if (continueButton) {
        continueButton.classList.remove("toggle");
      }
    }
    analyzeTracks();

    // fetch all of the audio features from the tracks
  }, []);

  useEffect(() => {
    console.log(currFeatures);
  }, [currFeatures]);

  return (
    <>
      <body>
        <main className="container-fluid">
          <nav className="row flex-nowrap">
            <a id="logo" href="/">
              <h2>Amplify</h2>
            </a>
            <button
              className="add-to-library-button"
              id="add-to-library-button"
              onClick={() => createPlaylist(props.authToken)}
            >
              Add to Library
            </button>
          </nav>
          <div>
            <div>
              <TrackAnalysis
                trackData={currSong}
                trackFeatures={currFeatures}
              ></TrackAnalysis>
            </div>
            <div className="recommended-track-container">
              header
              {props.noSongs} Songs,
              {convertToTime(props.totalTime)}
              {props.returnedTracks.map((track: trackResponse) => (
                <RecommendedTrackCard
                  currFeature={currFeatures}
                  setCurrFeatures={setCurrFeatures}
                  currId={currId}
                  setCurrId={setCurrId}
                  currSong={currSong}
                  setCurrSong={setCurrSong}
                  idFeatureMap={idFeatureMap}
                  resultInfo={track}
                  key={track.id}
                />
              ))}
            </div>
          </div>
        </main>
      </body>
    </>
  );
}
