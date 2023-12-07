import express, {Request, Response} from 'express'
import { authHandle, fetchToken } from './handlers/auth';
import cors from 'cors';
import { test } from './handlers/test';
import {AuthKey} from './handlerUtilities/authObj'
import { initialAuth } from './handlers/initialAuth';
import { searchArtistHandle } from './handlers/searchArtist';
import { getRecommendationsHandle } from './handlers/getRecommendations';
import { generatePlaylistHandle } from './handlers/generatePlaylist';



// a success response map
export interface successMap {
    status: string,
    data: any
}

// an error response map
export interface errorMap {
    status : string, 
    error_type: string,
    error_message: string
}

export type ResponseMap = successMap | errorMap;

export const app = express();

export const port = process.env.PORT || 3000;

// necessary to perform all spotify api calls not related to the user themselves
const clientAuthToken = new AuthKey()

// necessary to perform all spotify api calls related to the USER
const userAuthToken = new AuthKey()

app.options('*', cors())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello amplify server')
})

app.get('/client_auth', cors(), (req: Request, res: Response) => initialAuth(req, res, clientAuthToken))

// authorization endpoint
app.get('/auth', cors(), (req: Request, res: Response) => authHandle(req, res))

// fetches user authorization token.
app.get('/fetch_auth', (req: Request, res: Response) => fetchToken(req, res))

// for test purposes.
// app.get('/test', (req: Request, res: Response) => test(req, res, userAuthToken))

// to search an artist and get their uri -- needs the client Auth Token
app.get('/search_artist', (req: Request, res: Response) => searchArtistHandle(req, res, clientAuthToken) )

// to search for a set of recommendations
app.get('/get_recommendations', (req: Request, res: Response) => getRecommendationsHandle(req, res, clientAuthToken) )

// generates a new playlist for the user.
app.get('/generate_playlist', (req: Request, res: Response) => generatePlaylistHandle(req, res, clientAuthToken))


app.listen(port, () => {
    console.log('Server running on http://localhost:' + port)
})