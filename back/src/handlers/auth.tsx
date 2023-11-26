import { clientId, errorMap, successMap} from "../server"
import {Buffer} from 'buffer'

import {Request, Response} from 'express'

// checkout https://developer.spotify.com/documentation/web-api/tutorials/code-flow 
// for workflow 

export function authHandle(req: Request, res: Response) {
    const responseType = 'code'
    const scope : string = "playlist-modify-private"
    const state = Math.random()

    const redirect : string = 'https://accounts.spotify.com/authorize?' +
    `response_type=${responseType}&` + 
    `client_id=${clientId}&`+
    `scope=${scope}&` + 
    `redirect_uri=http://localhost:3000/fetch_auth&` +
    `state=${state}`
    
    console.log(redirect)
    res.redirect(redirect)
}

// we use any here cuz i can't figure out how to get the QueryP as a recognized type.
export async function fetchToken(req : Request, res : Response, token : any) {
    let userToken = req.query.code as string;
    let state = req.query.state as string || null;

    const client_secret = "6982f81b490f47ed8fd48b7fbcb45a87"
    console.log('next step auth')
    // error response map
    if (state === undefined) {
        let response : errorMap = {
            status: "error",
            error_type: "authentication_failed",
            error_message: "You did not approve Spotify authentication.",
        }
        res.send(response);
        console.log("temptooken null")
    } else {

        // constructing a post request
        const auth_url = 'https://accounts.spotify.com/api/token' 
        
        const body = new URLSearchParams({
            code: userToken,
            redirect_uri: `http://localhost:3000/fetch_auth`,
            grant_type: `authorization_code`    
        });
        const headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(clientId + ':' + client_secret).toString('base64')
        }

        // executing a post request.
        let response = await fetch(auth_url, {
            method: "POST",
            headers: headers, 
            body : body
        }).then(res => res.json())

        // retrieving access token from response.
        if ('access_token' in response) {
            token = response.access_token

            let serverResponse : successMap = {
                status: "success",
                data:"User successfully authenticated."

            }
            res.send(serverResponse)
        } else {
            let serverResponse : errorMap = {
                status: "error",
                error_type: "authentication_failed",
                error_message: "user did not approve Spotify authentication.",
            }

            // terminate server response
            res.send(serverResponse)
        }
        
    }
    console.log(token)
}