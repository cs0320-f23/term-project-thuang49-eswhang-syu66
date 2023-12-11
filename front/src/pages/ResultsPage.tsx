import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { trackResponse } from "../components/TrackResultCard";
import { RecommendedTrackCard } from "../components/RecommendedTrackCard";


interface sharedProps {
  returnedTracks: trackResponse[]
  setReturnedTracks: React.Dispatch<React.SetStateAction<trackResponse[]>>;

  totalTime: number
  setTotalTime: React.Dispatch<React.SetStateAction<number>>;

  noSongs: number
  setNoSongs: React.Dispatch<React.SetStateAction<number>>;

  authToken: string
}

export function ResultsPage(props: sharedProps) {

    let [searchParams] = useSearchParams();

    async function createPlaylist(authToken: string) {
      let url = "http://localhost:3000/generate_playlist?"
      url += `${'userToken'}=${authToken}&`
      url += `songs=${props.returnedTracks.map(track => track.uri).join(',')}`
      console.log(url)
      let genPlaylist = await fetch(url).then(res => res.json())


      if (genPlaylist.status === "success") {
        console.log('successfully addded to library')
      } else {
        console.error('error occurred in adding to library')
      }


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
    }, []);

    // aa
    return (
      <>
        <body>
          <main className="container-fluid">
            <nav className="row flex-nowrap">
              <a href = "/">
                <h2>Amplify</h2>
              </a>
              <button className="get-started-button" id="continue-button" onClick={() => createPlaylist(props.authToken)}>
                Add to Library
              </button>
            </nav>

            <div>
              {props.returnedTracks.map(track =>   
             <RecommendedTrackCard resultInfo = {track}></RecommendedTrackCard>)}
            </div>
          </main>
        </body>
      </>
    );
  }

