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

  async function createPlaylist(authToken: string) {
    let url = "http://localhost:3000/generate_playlist?";
    url += `${"userToken"}=${authToken}&`;
    url += `songs=${props.returnedTracks.map((track) => track.uri).join(",")}&`;
    url += `title=${playlistTitle}&`;
    // url += `img=${imgUrl.substring(23)}`;
    // console.log(url);
    const genPlaylist = await fetch(url).then((res) => res.json());

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

    // console.log(idFeatureMap);
  }

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
    // console.log(currFeatures);
  }, [currFeatures]);

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
    const loadingTitles: HTMLElement[] =
      document.getElementsByClassName("loading-title");
    const loadingTitleDivs: HTLMElement[] =
      document.querySelectorAll(".loading-title div");
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

  const generateAlbumImg = () => {
    const node = document.getElementById("album-image");

    if (node) {
      domtoimage
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
          //const album = document.querySelector(".playlist-header-wrapper");
          //album?.appendChild(img);
          //console.log(img.src);
          setImgUrl(img.src);
        })
        .catch(function (error: string) {
          console.error("oops, something went wrong!", error);
        });
    }
  };
  const generateAlbumArt = () => {
    let circleCount = parseInt("" + Math.random() * 21);
    circleCount += 5;
    const circleArr = [];

    const div = circleCount / 4;
    console.log(parseInt("" + div));
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

    console.log(bgColor);
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

    const albumImg = document.getElementById("album-image");
    if (albumImg) {
      albumImg.style.backgroundColor = bgColor;
    }

    const addToLibButton = document.getElementById("add-to-library-button");
    if (addToLibButton) {
      addToLibButton.style.backgroundColor = bgColor;
    }

    setAlbumArt(circleArr);

    generateAlbumImg();
  };

  useEffect(() => {
    const title: HTMLElement | null = document.querySelector(
      ".playlist-header-wrapper span"
    );
    if (title) {
      title.addEventListener("input", function () {
        setPlaylistTitle(title.innerText);
      });
      title.addEventListener("blur", () => {
        generateAlbumImg();
      });
    }
  }, []);

  return (
    <>
      <body>
        <main className="container-fluid">
          <nav className="row flex-nowrap">
            <a id="logo" href="/">
              {/* <h2>Amplify</h2> */}
              <img src={logo} alt="Amplify Logo"></img>
              <img id="logoAlt" src={logoBlack} alt="Amplify Logo"></img>
            </a>
            <button
              className="add-to-library-button"
              id="add-to-library-button"
              onClick={() => createPlaylist(props.authToken)}
            >
              Add to Library
            </button>
          </nav>
          <div className="loading-content">
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

          <div className="results-content">
            <div className="playlist-data">
              <div id="album-image">
                {albumArt}
                <div>{playlistTitle},</div>
                <div>Amplified</div>
              </div>
              <div className="playlist-header-wrapper">
                <div className="playlist-header">
                  <span className="input" role="textbox" contentEditable>
                    Playlists
                  </span>
                </div>
                <div className="playlist-header-data">
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

            <div className="recommended-track-container">
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
