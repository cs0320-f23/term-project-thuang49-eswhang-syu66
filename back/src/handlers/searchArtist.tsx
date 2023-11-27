import { clientId } from "../../private/keys"
import {Request, Response} from 'express'
import { AuthKey } from "../handlerUtilities/authObj"
import { errorMap, successMap } from "../server"



export async function searchArtistHandle(req: Request, res: Response, token: AuthKey) {
    console.log(req.query.artist)

    if (req.query.artist == undefined) {
        let clientResponse : errorMap = {
            status: "error",
            error_type: "bad_search",
            error_message: "no artist name was given!"
        }
        res.send(clientResponse)
    } else {
        let url = `https://api.spotify.com/v1/search?q=artist:${req.query.artist}&type=artist&limit=5`
        const headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token.getAuthToken()
        }

        let queryResponse = await fetch(url, {
            method: 'GET',
            headers : headers
        }).then(res => res.json())

        console.log(queryResponse)

        if ("artists" in queryResponse && "items" in queryResponse.artists) {
            let clientResponse : successMap = {
                status: "success",
                data: queryResponse.artists.items
            }
            res.send(clientResponse)
        } else {
            let clientResponse : errorMap = {
                status: "error",
                error_type: "bad_search",
                error_message: "search failed; was not able to search for provided artists"
            }
            res.send(clientResponse)
        }
    }

}
