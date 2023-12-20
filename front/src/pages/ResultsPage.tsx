import { ReactElement, useEffect, useState } from "react";
import { RecommendedTrackCard } from "../components/RecommendedTrackCard";
import { trackResponse } from "../interfaces/trackResponse";
import { featuresResponse } from "../interfaces/featuresResponse";
import domtoimage from "dom-to-image";
import "../css/ResultsPage.css";
import logo from "../assets/Logo White.svg";
import logoBlack from "../assets/Logo Black.svg";

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
  const [playlistTitle, setPlaylistTitle] = useState("Playlists");
  const [albumArt, setAlbumArt] = useState<ReactElement[]>([]);
  const [imgUrl, setImgUrl] = useState("");

  /**
   * Makes the fetch calls to generate the playlist
   * @param authToken authorization token needed to make the call
   */
  async function createPlaylist(authToken: string) {
    let url = "http://localhost:3000/generate_playlist?";
    url += `${"userToken"}=${authToken}&`;
    url += `songs=${props.returnedTracks.map((track) => track.uri).join(",")}&`;
    url += `title=${playlistTitle}&`;

    await generateAlbumImg();

    // sets the cover image using the one generated below
    const genPlaylist = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imgData: imgUrl.replace("data:image/jpeg;base64,", ""),
      }),
    }).then((res) => res.json());

    if (genPlaylist.status === "success") {
      console.log("successfully added to library");
      const addToLibButton = document.getElementById("add-to-library-button");
      if (addToLibButton) {
        addToLibButton.innerText = "Added to library ✓";
      }
    } else {
      console.error("error occurred in adding to library");
    }
  }

  // async function analyzeTracks() {
  //   let url = "http://localhost:3000/analyze_tracks?";
  //   url += `ids=${props.returnedTracks.map((track) => track.id).join(",")}`;

  //   const genPlaylist = await fetch(url).then((res) => res.json());

  //   if (genPlaylist.status === "success") {
  //     console.log("successfully analyzed");

  //     const feats: featuresResponse[] = genPlaylist.data;

  //     if (feats != undefined) {
  //       for (let i = 0; i < genPlaylist.data.length; i++) {
  //         if (i == 0) {
  //           setCurrFeatures(feats[i]);
  //           setCurrSong(
  //             props.returnedTracks.filter((x) => x.id === feats[i].id)[0]
  //           );
  //         }
  //         idFeatureMap.set(feats[i].id, feats[i]);
  //       }
  //     } else {
  //       console.error("malformed response produced by analyze_tracks endpoint");
  //     }
  //   } else {
  //     console.error("error occurred in adding to library");
  //   }

  //   // console.log(idFeatureMap);
  // }

  /**
   * Formats time for displaying in the playlist header
   * @param durationMs raw time passed in
   * @returns formatted time
   */
  function convertToTime(durationMs: number) {
    let seconds = durationMs / 1000;

    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    // Calculate remaining minutes and seconds
    minutes %= 60;
    seconds %= 60;

    let returnTime = ``;
    returnTime += hours + " hr ";
    returnTime += minutes + " min";

    return returnTime;
  }

  useEffect(() => {}, [currFeatures]);

  /**
   * Timeouts for loading state. Changes the transition timing and background
   * color for each frame, and animates the three dots for each loading phrase.
   */
  useEffect(() => {
    document.body.style.backgroundColor = "#162764";
    document.body.style.transition = "1.6s cubic-bezier(0.68, 0.69, 0.03, 1)";
    const resultsContent: HTMLElement | null =
      document.querySelector(".results-content");
    const loadingContent: HTMLElement | null =
      document.querySelector(".loading-content");
    if (resultsContent) {
      resultsContent.style.opacity = "0";
    }
    const loadingTitles: HTMLElement[] = Array.from(
      document.getElementsByClassName(
        "loading-title"
      ) as HTMLCollectionOf<HTMLElement>
    );

    const loadingTitleDivs: HTMLElement[] = Array.from(
      document.querySelectorAll(".loading-title div")
    );
    setTimeout(() => {
      document.body.style.backgroundColor = "#BF357F";
      loadingTitles[0].style.top = "0";
      loadingTitleDivs[0].style.animation = "ellipse 0.5s ease 0.6s";
      loadingTitleDivs[1].style.animation = "ellipse 0.5s ease 0.7s";
      loadingTitleDivs[2].style.animation = "ellipse 0.5s ease 0.85s";
    }, 0); // 0ms delay
    setTimeout(() => {
      loadingTitleDivs[0].style.animation = "";
      loadingTitleDivs[1].style.animation = "";
      loadingTitleDivs[2].style.animation = "";
    }, 1250);
    setTimeout(() => {
      document.body.style.backgroundColor = "#FA7D6C";
      loadingTitles[0].style.opacity = "70%";
      loadingTitles[1].style.top = "0";
      loadingTitleDivs[0].style.animation = "ellipse 0.5s ease 0.6s";
      loadingTitleDivs[1].style.animation = "ellipse 0.5s ease 0.7s";
      loadingTitleDivs[2].style.animation = "ellipse 0.5s ease 0.85s";
      loadingTitleDivs[3].style.animation = "ellipse 0.5s ease 0.6s";
      loadingTitleDivs[4].style.animation = "ellipse 0.5s ease 0.7s";
      loadingTitleDivs[5].style.animation = "ellipse 0.5s ease 0.85s";
    }, 1500); // 0ms + 1250ms + 250ms delay
    setTimeout(() => {
      loadingTitleDivs[0].style.animation = "";
      loadingTitleDivs[1].style.animation = "";
      loadingTitleDivs[2].style.animation = "";
      loadingTitleDivs[3].style.animation = "";
      loadingTitleDivs[4].style.animation = "";
      loadingTitleDivs[5].style.animation = "";
    }, 2750);
    setTimeout(() => {
      document.body.style.backgroundColor = "#F6AACF";
      loadingTitles[0].style.opacity = "40%";
      loadingTitles[1].style.opacity = "70%";
      loadingTitles[2].style.top = "0";
      loadingTitleDivs[0].style.animation = "ellipse 0.5s ease 0.75s";
      loadingTitleDivs[1].style.animation = "ellipse 0.5s ease 0.85s";
      loadingTitleDivs[2].style.animation = "ellipse 0.5s ease 1s";
      loadingTitleDivs[3].style.animation = "ellipse 0.5s ease 0.75s";
      loadingTitleDivs[4].style.animation = "ellipse 0.5s ease 0.85s";
      loadingTitleDivs[5].style.animation = "ellipse 0.5s ease 1s";
      loadingTitleDivs[6].style.animation = "ellipse 0.5s ease 0.75s";
      loadingTitleDivs[7].style.animation = "ellipse 0.5s ease 0.85s";
      loadingTitleDivs[8].style.animation = "ellipse 0.5s ease 1s";
    }, 3050); // 0ms + 1250ms + 250ms + 1250ms + 300ms delay
    setTimeout(() => {
      document.body.style.backgroundColor = "#FFE27B";
      document.body.style.transition = "1.6s cubic-bezier(0.68, 0.69, 0.03, 1)";
      if (resultsContent) {
        resultsContent.style.opacity = "100%";
        resultsContent.style.top = "calc(-100% + 3em)";
      }
      if (loadingContent) {
        loadingContent.style.top = "-100%";
        loadingContent.style.opacity = "0";
      }

      const logo: HTMLImageElement | null =
        document.querySelector("a#logo img");
      const logo2: HTMLImageElement | null = document.querySelector("#logoAlt");
      if (logo && logo2) {
        logo.style.opacity = "0";
        logo2.style.opacity = "1";
        logo.style.transition = "1.6s cubic-bezier(0.68, 0.69, 0.03, 1)";
        logo2.style.transition = "1.6s cubic-bezier(0.68, 0.69, 0.03, 1)";
      }

      const addToLibButton: HTMLElement | null = document.querySelector(
        ".add-to-library-button"
      );
      if (addToLibButton) {
        addToLibButton.style.top = "1em";
      }
      generateAlbumArt();
    }, 5300); // 0ms + 1250ms + 250ms + 1250ms + 300ms + 1250ms + 1000ms delay
  }, []);

  /**
   * Creates the playlist cover image by using dom-to-image to generate a JPEG,
   * then sets up the JPEG URL to be used by the createPlaylist method.
   */
  async function generateAlbumImg() {
    const node = document.getElementById("album-image");

    if (node) {
      await domtoimage
        .toJpeg(node, {
          quality: 0.99,
          width: 600,
          height: 600,
          style: {
            borderRadius: 0,
            transform: `scale(calc(600 / ${node.clientWidth}))`,
            transformOrigin: "top left",
          },
        })
        .then(function (dataUrl: string) {
          const img = new Image();
          img.src = dataUrl;
          console.log(img.src);
          setImgUrl(img.src);
        })
        .catch(function (error: string) {
          console.error("oops, something went wrong!", error);
        });
    }
  }

  /**
   * Creates the actual playlist cover image by randomly generating circles to
   * be placed on the div canvas.
   */
  function generateAlbumArt() {
    // range from 5-25 circles in a 5x5 grid.
    let circleCount = parseInt("" + Math.random() * 21);
    circleCount += 5;
    const circleArr = [];

    // divide by four to get a random color combination from a list.
    const div = circleCount / 4;
    let bgColor = "";
    let circleColor = "";
    switch (parseInt("" + div)) {
      case 1:
        bgColor = "#3A5353";
        circleColor = "#6E96BB";
        break;
      case 2:
        bgColor = "#738676";
        circleColor = "#CDD4D5";
        break;
      case 3:
        bgColor = "#133F0F";
        circleColor = "#D2D396";
        break;
      case 4:
        bgColor = "#6371A2";
        circleColor = "#C7C8D3";
        break;
      default:
        bgColor = "#8A385A";
        circleColor = "#CFB2AF";
        break;
    }

    // appends the circles to the document
    for (let i = 0; i < circleCount; i++) {
      const left = parseInt("" + Math.random() * 5) * 4 + "vw";
      const top = parseInt("" + Math.random() * 5) * 4 + "vw";
      circleArr.push(
        <div
          className="circle"
          style={{ left: left, top: top, backgroundColor: circleColor }}
        ></div>
      );
    }

    // sets up the background color of the image
    const albumImg = document.getElementById("album-image");
    if (albumImg) {
      albumImg.style.backgroundColor = bgColor;
    }

    // sets the color of the circles
    const addToLibButton = document.getElementById("add-to-library-button");
    if (addToLibButton) {
      addToLibButton.style.backgroundColor = bgColor;
    }
    setAlbumArt(circleArr);
  }

  /**
   * Generates the album image every time the album art is updated.
   */
  useEffect(() => {
    generateAlbumImg();
  }, [albumArt]);

  /**
   * Updates the playlist image to match what a user types into the playlist
   * header, and re-generates the JPEG after they click away.
   */
  useEffect(() => {
    const title: HTMLElement | null = document.querySelector(
      ".playlist-header-wrapper span"
    );
    if (title) {
      title.addEventListener("input", function () {
        setPlaylistTitle(title.innerText);
        generateAlbumImg();
      });
      title.addEventListener("blur", () => {
        generateAlbumImg();
      });
    }
  }, []);

  return (
    <>
      <body>
        <main aria-label="Results page" className="container-fluid">
          <nav className="row flex-nowrap">
            <a aria-label="Amplify Logo" id="logo" href="/">
              {/* <h2>Amplify</h2> */}
              <img src={logo} alt="Amplify Logo"></img>
              <img id="logoAlt" src={logoBlack} alt="Amplify Logo"></img>
            </a>
            <button
              aria-label="Add playlist to library"
              className="add-to-library-button"
              id="add-to-library-button"
              onClick={() => createPlaylist(props.authToken)}
            >
              Add to library
            </button>
          </nav>
          <div aria-label="Loading screen" className="loading-content">
            <h1 className="loading-title">
              Gathering beats
              <div>.</div>
              <div>.</div>
              <div>.</div>
            </h1>
            <h1 className="loading-title">
              Sourcing tracks
              <div>.</div>
              <div>.</div>
              <div>.</div>
            </h1>
            <h1 className="loading-title">
              Generating playlist
              <div>.</div>
              <div>.</div>
              <div>.</div>
            </h1>
          </div>

          <div
            aria-label="Generated playlist result page"
            className="results-content"
          >
            <div className="playlist-data">
              <div aria-label="Playlist cover image" id="album-image">
                {albumArt}
                <div>{playlistTitle},</div>
                <div>Amplified</div>
              </div>
              <div className="playlist-header-wrapper">
                <div
                  aria-label="Playlist title. Click to edit; also changes playlist cover image upon clicking away from the textbox."
                  className="playlist-header"
                >
                  <span className="input" role="textbox" contentEditable>
                    Playlists
                  </span>
                </div>
                <div
                  aria-label="Data about the generated playlist"
                  className="playlist-header-data"
                >
                  {props.noSongs + (props.noSongs === 1 ? " song" : " songs")}
                  ,&nbsp;
                  {convertToTime(props.totalTime)}
                </div>
              </div>
              {/* <TrackAnalysis
              trackData={currSong}
              trackFeatures={currFeatures}
            ></TrackAnalysis> */}
              {/* <div className="track-analysis"></div> */}
            </div>

            <div
              aria-label="Preview of tracks in the generated playlist"
              className="recommended-track-container"
            >
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
                  number={props.returnedTracks.indexOf(track) + 1}
                />
              ))}
            </div>
          </div>
        </main>
      </body>
    </>
  );
}
