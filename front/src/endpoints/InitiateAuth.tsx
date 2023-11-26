import {clientId} from '../../private/keys'


export function InitiateAuth() {

    function authHandle() {
        const responseType = 'code'
        const scope : string = "playlist-modify-private"
        const state = Math.random()
    
        const redirect : string = 'https://accounts.spotify.com/authorize?' +
        `response_type=${responseType}&` + 
        `client_id=${clientId}&`+
        `scope=${scope}&` + 
        `redirect_uri=http://localhost:3000/fetch_auth&` +
        `state=${state}`
        
        // console.log(redirect)
        return redirect
        // res.redirect(redirect)
    }

    return (
        <a href = {authHandle()}>
            <button onClick={authHandle}>
                auth button
            </button>
        </a>
    )
}