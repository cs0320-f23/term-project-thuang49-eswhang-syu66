import {Request, Response} from 'express'
import { AuthKey } from "../handlerUtilities/authObj"
import { errorMap, successMap } from "../server"

export async function getGenres(req: Request, res: Response, token : AuthKey) {
    const url = `https://api.spotify.com/v1/recommendations/available-genre-seeds`
    
    const headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token.getAuthToken()
    }

    let queryResponse = await fetch(url, {
        method: 'GET',
        headers : headers
    }).then(res => res.json())

    if ("genres" in queryResponse) {
        let clientResponse : successMap = {
            status: "success",
            data: queryResponse
        }
        res.send(clientResponse)
        return 
    }  else {
        let clientResponse : errorMap = {
            status: "error",
            error_type: "bad_authentication",
            error_message: "was not able to retrieve available genres"
        }
        res.send(clientResponse)
        return
    }

}

