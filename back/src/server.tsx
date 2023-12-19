import express, {Request, Response} from 'express'
import { authHandle, fetchToken } from './handlers/auth';
import cors from 'cors';
import {AuthKey} from './handlerUtilities/authObj'
import { initialAuth } from './handlers/initialAuth';
import { searchHandle } from './handlers/search';
import { getRecommendationsHandle } from './handlers/getRecommendations';
import { generatePlaylistHandle } from './handlers/generatePlaylist';
import { search_uid } from './handlers/UIDSearch';
import { getGenres } from './handlers/getGenres';
import { getAudioFeatures } from './handlers/getAudioFeatures';



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
app.use(express.json({ limit: '2mb' }));

export const port = process.env.PORT || 3000;

// necessary to perform all spotify api calls not related to the user themselves
const clientAuthToken = new AuthKey()

app.options('*', cors())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello amplify server')
})

app.get('/client_auth', cors(), (req: Request, res: Response) => initialAuth(req, res, clientAuthToken))

// authorization endpoint
app.get('/auth', cors(), (req: Request, res: Response) => authHandle(req, res))

// fetches user authorization token.
app.get('/fetch_auth', (req: Request, res: Response) => fetchToken(req, res))

// to search an artist and get their uri -- needs the client Auth Token
app.get('/search',cors(), (req: Request, res: Response) => searchHandle(req, res, clientAuthToken) )

// to search for a set of recommendations
app.get('/get_recommendations', cors(), (req: Request, res: Response) => getRecommendationsHandle(req, res, clientAuthToken) )

// generates a new playlist for the user.
app.post('/generate_playlist', cors(), (req: Request, res: Response) => generatePlaylistHandle(req, res, clientAuthToken))

// searches for an artist or track based on the id
app.get('/search_id', cors(), (req: Request, res: Response) => search_uid(req, res, clientAuthToken))

// retrives all available genres
app.get('/get_genres', cors(), (req: Request, res: Response) => getGenres(req, res, clientAuthToken))

// analyzes all recommended tracks.
app.get('/analyze_tracks', cors(), (req: Request, res: Response) => getAudioFeatures(req, res, clientAuthToken))

app.listen(port, () => {
    console.log('Server running on http://localhost:' + port)
})