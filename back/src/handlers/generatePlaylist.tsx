import { clientId } from "../../private/keys"
import {Request, Response} from 'express'
import { AuthKey } from "../handlerUtilities/authObj"
import { errorMap, successMap } from "../server"
import { authHandle } from "./auth"




export async function generatePlaylistHandle(req: Request, res: Response, clientToken: AuthKey) {

    const userToken = req.query.userToken;
    if (userToken == undefined) {
        let clientResponse : errorMap = {
            status: "error",
            error_type: "authentication_failure",
            error_message: "Improper authentication was provided to the generatePlyalistHandler"
        }
        res.status(401)
        res.send(clientResponse)
    }

    //TODO: parse the query params from the req made by the frontend and create a fetch call with that

    // receiving a user's userid
    const profileFetch = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + userToken
        }
    }).then(res => res.json())

    if ("id" !in profileFetch) {
        let clientResponse : errorMap = {
            status: "error",
            error_type: "user_not_found",
            error_message: "Could not find the user; likely resulted from improper authentication"
        }
        res.status(404)
        res.send(clientResponse) 
    }

    const userid : string = profileFetch.id


    // todo make this playlist name customizable.
    const data = {
        "name": "Amplify Playlist",
        "public": false
    }

    // creating the playlist
    const playlist = await fetch("https://api.spotify.com/v1/users/" + userid + "/playlists", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + userToken,
        },
        body: JSON.stringify(data)
    }).then(res => res.json())

    // not really sure what this is? checking playlist.status for !201 is sufficient.
    if ("status" in playlist) {
        let clientResponse : errorMap = {
            status: "error",
            error_type: "playlist_creation_failure",
            error_message: "playlist creation failed; client likely did not authenticate"
        }
        res.send(clientResponse)
        return
    }

    // ------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------
    // stopped here 


    const playlist_id = playlist.data.id
      
    const url = playlist.data.external_urls.spotify

    let uri_string = ""
    // for (const uri of songs) {
    //   uri_string += uri + ","
    // }

    const addSongs = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks?uris=" + uri_string, {
      method: 'POST',
      headers: {
        Authorization: "Bearer " + userToken,
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