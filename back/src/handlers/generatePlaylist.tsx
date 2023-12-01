import { clientId } from "../../private/keys"
import {Request, Response} from 'express'
import { AuthKey } from "../handlerUtilities/authObj"
import { errorMap, successMap } from "../server"



export async function generatePlaylistHandle(req: Request, res: Response, token: AuthKey, songs: String[]) {
    // receiving a user's userid
    const userid = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token.getAuthToken()
        }
    })

    const data = {
        "name": "Amplify Playlist",
        "public": false
    }

    // creating the playlist
    const playlist = await fetch("https://api.spotify.com/v1/users/" + userid + "/playlists", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data)
    }).then(res => res.json())

    if ("status" in playlist) {
        let clientResponse : errorMap = {
            status: "error",
            error_type: "playlist_creation_failure",
            error_message: "playlist creation failed; client likely did not authenticate"
        }
        res.send(clientResponse)
        return
    }

    const playlist_id = playlist.data.id
      
    const url = playlist.data.external_urls.spotify

    let uri_string = ""
    for (const uri of songs) {
      uri_string += uri + ","
    }

    const addSongs = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks?uris=" + uri_string, {
      method: 'POST',
      headers: {
        Authorization: "Bearer " + token,
      }
    }).then(res => res.json())

    if ("snapshot_id" in addSongs) {
        let clientResponse : successMap = {
            status: "success",
            data: "playlist successfully created"
        }
        res.send(clientResponse)
    } else {
        let clientResponse : errorMap = {
            status: "error",
            error_type: "song_addition_failure",
            error_message: "adding songs to playlist failed"
        }
        res.send(clientResponse)
    }
}