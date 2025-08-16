import { clientId } from "../../private/keys";
import { Request, Response } from "express";
import { AuthKey } from "../handlerUtilities/authObj";
import { errorMap, successMap } from "../server";

interface trackResponse {
  album: {
    images: {
      url: string;
      height: number;
      width: number;
    }[];
  };
  artists: {
    name: string;
  }[];
  id: string;
  name: string;
  type: string;
  duration_ms: number;
  uri: string;
}

export async function getPlaylistHandle(
  req: Request,
  res: Response,
  token: AuthKey
) {
  let url =
    "https://api.spotify.com/v1/playlists/6QcLtKRlskGf3DwNypESny/tracks?limit=50&offset=0";

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    Authorization: "Bearer " + token.getAuthToken(),
  };

  let queryResponse = await fetch(url, {
    method: "GET",
    headers: headers,
  }).then((res) => res.json());

  if ("items" in queryResponse) {
    let tracks = queryResponse.items;

    // using Fisher-Yates algorithm to shuffle the returned list of tracks
    for (let i = tracks.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
    }

    let tracksToAdd: trackResponse[] = [];
    let numSongs = 0;
    let playlistDuration = 0;

    // playlist of a specified number of songs
    // if (req.query.number != undefined && req.query.duration == undefined) {
    //   tracksToAdd = tracks;
    //   numSongs = tracks.length;
    //   tracks.map((track: any) => (playlistDuration += track.track.duration_ms));
    // } else if (
    //   req.query.number == undefined &&
    //   req.query.duration != undefined
    // ) {
    //   //filtering for a given duration
    //   while (numSongs < 100 && playlistDuration < Number(req.query.duration)) {
    //     tracksToAdd = [...tracksToAdd, tracks[numSongs]];
    //     numSongs += 1;
    //     playlistDuration += tracks[numSongs].duration_ms;
    //   }
    // } else {
    //   // default 20-song playlist
    //   tracksToAdd = tracks;
    //   numSongs = tracks.length;
    //   tracks.map(
    //     (track: trackResponse) => (playlistDuration += track.duration_ms)
    //   );
    // }

    tracksToAdd = tracks;
    numSongs = tracks.length;
    tracks.map((track: any) => (playlistDuration += track.track.duration_ms));

    let clientResponse: successMap = {
      status: "success",
      data: {
        tracks: tracksToAdd,
        total_ms: playlistDuration,
        no_songs: numSongs,
      },
    };
    res.send(clientResponse);
  } else {
    let clientResponse: errorMap = {
      status: "error",
      error_type: "bad_search",
      error_message:
        "search failed; client likely did not authenticate before searching",
    };
    res.send(clientResponse);
  }
}

// http://localhost:3000/get_recommendations?seed_artists=7tYKF4w9nC0nq9CsPZTHyP,6eUKZXaKkcviH0Ku9w2n3V,6vWDO969PvNqNYHIOW5v0m
