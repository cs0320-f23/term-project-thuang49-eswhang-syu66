import {Request, Response} from 'express'
import { AuthKey } from "../handlerUtilities/authObj"
import { errorMap, successMap } from "../server"

export async function getAudioFeatures(req: Request, res: Response, token : AuthKey) {

    let url = `https://api.spotify.com/v1/audio-features?`
    
    const headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token.getAuthToken()
    }
    
    if (req.query.ids == undefined) {
        let clientResponse : errorMap = {
            status: "error",
            error_type: "malformed_request",
            error_message: "did not receive and track ids to analyze"
        }
        res.send(clientResponse)
    }

    url += `ids=${req.query.ids}`

    let queryResponse = await fetch(url, {
        method: 'GET',
        headers : headers
    }).then(res => res.json())

    if ("audio_features" in queryResponse) {
        let clientResponse : successMap = {
            status: "success",
            data: queryResponse.audio_features
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