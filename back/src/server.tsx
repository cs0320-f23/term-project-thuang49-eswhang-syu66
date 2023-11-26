import express, {Request, Response} from 'express'
import { authHandle, fetchToken } from './handlers/auth';
import cors from 'cors';



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
export const clientId : string = "611754e9a5f14adfabdde1d55224815e";

export let userAuthToken : string;

app.options('*', cors())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello amplify server')
})

// authorization endpoint
app.get('/auth', cors(), (req: Request, res: Response) => authHandle(req, res))

// fetches user authorization token.
app.get('/fetch_auth', (req: Request, res: Response) => fetchToken(req, res, userAuthToken))

app.listen(port, () => {
    console.log('Server running on http://localhost:' + port)
})