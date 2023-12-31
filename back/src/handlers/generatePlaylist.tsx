import { clientId } from "../../private/keys";
import { Request, Response } from "express";
import { AuthKey } from "../handlerUtilities/authObj";
import { errorMap, successMap } from "../server";

export async function generatePlaylistHandle(
  req: Request,
  res: Response,
  clientToken: AuthKey
) {
  const userToken = req.query.userToken;
  if (userToken == undefined) {
    let clientResponse: errorMap = {
      status: "error",
      error_type: "authentication_failure",
      error_message:
        "Improper authentication was provided to the generatePlaylistHandler",
    };
    res.status(401);
    res.send(clientResponse);
    return;
  }

  //TODO: parse the query params from the req made by the frontend and create a fetch call with that

  // receiving a user's userid
  const profileFetch = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userToken,
    },
  }).then((res) => res.json());

  if (!("id" in profileFetch)) {
    let clientResponse: errorMap = {
      status: "error",
      error_type: "user_not_found",
      error_message:
        "Could not find the user; likely resulted from improper authentication",
    };
    res.status(404);
    res.send(clientResponse);
    return;
  }

  const userid: string = profileFetch.id;

  const title = req.query.title;
  if (title == undefined) {
    let clientResponse: errorMap = {
      status: "error",
      error_type: "title_failure",
      error_message: "Unable to parse playlist title",
    };
    res.status(401);
    res.send(clientResponse);
    return;
  }
  const data = {
    name: title + ", Amplified",
    public: false,
  };

  // creating the playlist
  const playlist = await fetch(
    "https://api.spotify.com/v1/users/" + userid + "/playlists",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());

  // not really sure what this is? checking playlist.status for !201 is sufficient.
  // i check it this way because the success response does not have a status for some reason
  if ("status" in playlist) {
    let clientResponse: errorMap = {
      status: "error",
      error_type: "playlist_creation_failure",
      error_message:
        "playlist creation failed; client likely did not authenticate",
    };
    res.send(clientResponse);
    return;
  }

  const playlist_id = playlist.id;

  // uploading image to the playlist
  if (req.body != undefined && "imgData" in req.body) {
    const imgData = req.body.imgData;

    const url = `https://api.spotify.com/v1/playlists/${playlist_id}/images`;

    const img = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "image/jpeg",
      },
      body: imgData,
    });

    if (img.status === 202) {
      console.log("Image successfully uploaded to playlist");
    } else {
      console.error("Image was not able to be uploaded to playlist.");
    }
  }

  // format for query param should be comma separated, example: url?songs=spotify%3Atrack%3A4iV5W9uYEdYUVa79Axb7Rh,spotify%3Atrack%3A1301WleyT98MSxVHPZCA6M
  const uri_string = req.query.songs;

  const addSongs = await fetch(
    "https://api.spotify.com/v1/playlists/" +
      playlist_id +
      "/tracks?uris=" +
      uri_string,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    }
  ).then((res) => res.json());

  console.log(addSongs);

  if ("snapshot_id" in addSongs) {
    let clientResponse: successMap = {
      status: "success",
      data: "playlist successfully created",
    };
    res.send(clientResponse);
    return;
  } else {
    let clientResponse: errorMap = {
      status: "error",
      error_type: "song_addition_failure",
      error_message: "adding songs to playlist failed",
    };
    res.send(clientResponse);
    return;
  }
}
