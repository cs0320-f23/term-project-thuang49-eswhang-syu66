import { clientId } from "../../private/keys"
import {Request, Response} from 'express'
import { AuthKey } from "../handlerUtilities/authObj"
import { errorMap, successMap } from "../server"



export async function getRecommendationsHandle(req: Request, res: Response, token: AuthKey) {


    if (req.query.seed_genres == undefined && req.query.seed_tracks == undefined && req.query.seed_artists == undefined) {
        let clientResponse : errorMap = {
            status: "error",
            error_type: "bad_search",
            error_message: "no seed genre/tracks/artists were given!"
        }
        res.send(clientResponse)
    } else {
        let url = "https://api.spotify.com/v1/recommendations?"

        if (req.query.limit != undefined) {
            url += `limit=${req.query.limit}&`
        }

        // adding all of the parameters to the query
        if (req.query.seed_artists != undefined) {
            url += `seed_artists=${req.query.seed_artists}&`
        }
        if (req.query.seed_artists != undefined) {
            url += `seed_genres=${req.query.seed_genres}&`
        }
        if (req.query.seed_tracks != undefined) {
            url += `seed_tracks=${req.query.seed_tracks}&`
        }

        // acousticness 
        if (req.query.min_acousticness != undefined){
            url += `min_acousticness=${req.query.min_acousticness}&`
        }
        if (req.query.max_acousticness != undefined) {
            url += `max_acousticness=${req.query.max_acousticness}&`
        }
        if (req.query.target_acousticness != undefined){
            url += `target_acousticness=${req.query.target_acousticness}&`
        }

        // danceability
        if (req.query.min_danceability != undefined) {
            url += `min_danceability=${req.query.min_danceability}&`
        }
        if (req.query.max_danceability != undefined) {
            url += `max_danceability=${req.query.max_danceability}&`
        }
        if (req.query.target_danceability != undefined) {
            url += `target_danceability=${req.query.target_danceability}&`
        }

        //duraction 
        if (req.query.min_duration_ms != undefined) {
            url += `min_duration_ms =${req.query.min_duration_ms}&`
        }
        if (req.query.max_duration_ms != undefined) {
            url += `max_duration_ms=${req.query.max_duration_ms}&`
        }
        if (req.query.target_duration_ms != undefined) {
            url += `target_duration_ms=${req.query.target_duration_ms}&`
        }

        //energy
        if (req.query.min_energy != undefined) {
            url += `min_energy =${req.query.min_energy}&`
        }
        if (req.query.max_energy != undefined) {
            url += `max_energy=${req.query.max_energy}&`
        }
        if (req.query.target_energy != undefined) {
            url += `target_energy=${req.query.target_energy}&`
        }

        //instrumentalness
        if (req.query.min_instrumentalness != undefined) {
            url += `min_instrumentalness =${req.query.min_instrumentalness}&`
        }
        if (req.query.max_instrumentalness != undefined) {
            url += `max_instrumentalness=${req.query.max_instrumentalness}&`
        }
        if (req.query.target_instrumentalness != undefined) {
            url += `target_instrumentalness=${req.query.target_instrumentalness}&`
        }
                
        // key
        if (req.query.min_key != undefined) {
            url += `min_key =${req.query.min_key}&`
        }
        if (req.query.max_key != undefined) {
            url += `max_key=${req.query.max_key}&`
        }
        if (req.query.target_key != undefined) {
            url += `target_key=${req.query.target_key}&`
        }

        // liveness
        if (req.query.min_liveness != undefined) {
            url += `min_liveness =${req.query.min_liveness}&`
        }
        if (req.query.max_liveness != undefined) {
            url += `max_liveness=${req.query.max_liveness}&`
        }
        if (req.query.target_liveness != undefined) {
            url += `target_liveness=${req.query.target_liveness}&`
        }

        // loudness
        if (req.query.min_loudness != undefined) {
            url += `min_loudness =${req.query.min_loudness}&`
        }
        if (req.query.max_loudness != undefined) {
            url += `max_loudness=${req.query.max_loudness}&`
        }
        if (req.query.target_loudness != undefined) {
            url += `target_loudness=${req.query.target_loudness}&`
        }

        // popularity
        if (req.query.min_popularity != undefined) {
            url += `min_popularity =${req.query.min_popularity}&`
        }
        if (req.query.max_popularity != undefined) {
            url += `max_popularity=${req.query.max_popularity}&`
        }
        if (req.query.target_popularity != undefined) {
            url += `target_popularity=${req.query.target_popularity}&`
        }

        // skipping mode, popularity, speechiness

        // tempo
        if (req.query.min_tempo != undefined) {
            url += `min_tempo =${req.query.min_tempo}&`
        }
        if (req.query.max_tempo != undefined) {
            url += `max_tempo=${req.query.max_tempo}&`
        }
        if (req.query.target_tempo != undefined) {
            url += `target_tempo=${req.query.target_tempo}&`
        }

        // skipping time signature 

        // valence
        if (req.query.min_valence != undefined) {
            url += `min_valence =${req.query.min_valence}&`
        }
        if (req.query.max_valence != undefined) {
            url += `max_valence=${req.query.max_valence}&`
        }
        if (req.query.target_valence != undefined) {
            url += `target_valence=${req.query.target_valence}&`
        }


        const headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token.getAuthToken()
        }

        let queryResponse = await fetch(url, {
            method: 'GET',
            headers : headers
        }).then(res => res.json())

        console.log(queryResponse)

        if ("tracks" in queryResponse) {
            let clientResponse : successMap = {
                status: "success",
                data: queryResponse.tracks
            }
            res.send(clientResponse)
        } else {
            let clientResponse : errorMap = {
                status: "error",
                error_type: "bad_search",
                error_message: "search failed; client likely did not authenticate before searching"
                // console.log(queryResponse)
            }
            res.send(clientResponse)
        }
    }

}
// http://localhost:3000/get_recommendations?seed_artists=7tYKF4w9nC0nq9CsPZTHyP,6eUKZXaKkcviH0Ku9w2n3V,6vWDO969PvNqNYHIOW5v0m