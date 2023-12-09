import { AuthKey } from "../handlerUtilities/authObj";
import express, {Request, Response} from 'express'
import { errorMap, successMap } from "../server";


export async function search_uid(req: Request, res: Response, client_auth:AuthKey) {

    if (req.query.category == undefined || req.query.id == undefined) {
        let clientResponse : errorMap = {
            status: "error",
            error_type: "bad_search",
            error_message: "Either category or uid was undefined."
        }
        res.send(clientResponse)
        return

    } else {

        if (req.query.category != "artists" && req.query.category != 'tracks') {
            let clientResponse : errorMap = {
                status: "error",
                error_type: "bad_search",
                error_message: "Unsupported category consumed."
            }
            res.send(clientResponse)
            return
        }


        let url = `https://api.spotify.com/v1/${req.query.category}/${req.query.id}`
        const headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + client_auth.getAuthToken()
        }

        let queryResponse = await fetch(url, {
            method: 'GET',
            headers : headers
        }).then(res => res.json())

        console.log(queryResponse)

        if (!("name" in queryResponse) || !("id" in queryResponse)) {
            let clientResponse : errorMap = {
                status: "error",
                error_type: "bad_search",
                error_message: "search failed; was not able to find " + req.query.category + ": " + req.query.id
            }
            res.send(clientResponse)
            return
        } else if (queryResponse.error.status == 401) {
            let clientResponse : errorMap = {
                status: "error",
                error_type: "invalid_authentication",
                error_message: "invalid client authentication"
            }
            res.send(clientResponse)
            return
        }

        // console.log('artist')
        
        if (req.query.category == 'artists') {
            let imageurl = ""
            if (queryResponse.images[0] != undefined) {
                imageurl = queryResponse.images[0].url
            }
            let dataObj = {
                pictureUrl: imageurl, 
                name: queryResponse.name
            }
            let clientResponse : successMap = {
                status: "success",
                data: dataObj
            }
            res.send(clientResponse)
        } else if (req.query.category == 'tracks') {
            let imageurl = "";
            if (queryResponse.album.images[0] != undefined) {
                imageurl = queryResponse.album.images[0].url
            } 
            let dataObj = {
                pictureUrl: imageurl, 
                name: queryResponse.name
            }
            let clientResponse : successMap = {
                status: "success",
                data: dataObj
            }
            res.send(clientResponse)
        } else {
            let clientResponse : errorMap = {
                status: "error",
                error_type: "bad_search",
                error_message: "Unsupported uid category"
            }
            res.send(clientResponse)
        }
    }
}