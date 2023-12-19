import { errorMap, successMap} from "../server"
import {clientId, client_secret} from "../../private/keys";
import {Buffer} from 'buffer'

import {Request, Response} from 'express'
const frontEndBaseURL = 'http://localhost:8000/feats'

// checkout https://developer.spotify.com/documentation/web-api/tutorials/code-flow 
// for workflow 
export function authHandle(req: Request, res: Response) {
        const responseType = 'code'
        const scope : string = "playlist-modify-private playlist-modify-public ugc-image-upload"
        const state = Math.random()
    
        const redirect : string = 'https://accounts.spotify.com/authorize?' +
        `response_type=${responseType}&` + 
        `client_id=${clientId}&`+
        `scope=${scope}&` + 
        `redirect_uri=http://localhost:3000/fetch_auth&` +
        `state=${state}`
        
        res.redirect(redirect)
}

export async function fetchToken(req : Request, res : Response) {

    let userToken = req.query.code as string;
    let state = req.query.state as string || null;

    // error response map
    if (state === undefined) {

        let redirect_uri : string = frontEndBaseURL + `?error=authentication_failed`
        res.redirect(403,  redirect_uri)
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
            
            let redirect_uri : string = frontEndBaseURL + `?success=${response.access_token}`
            res.redirect(302, redirect_uri)
            
        } else {
            // terminate server response
            let redirect_uri : string = frontEndBaseURL + `?error=authentication_failed`
            res.redirect(403 , redirect_uri)
        }
        
    }
}