

export function InitiateAuth() {

    async function authOnclick() {
        let res = await fetch("http://localhost:3000/auth")
        .then(res => res.json())

        // console.log(res)
    }

    function authHandle() {
        const responseType = 'code'
        const scope : string = "playlist-modify-private"
        const state = Math.random()
        const clientId : string = "611754e9a5f14adfabdde1d55224815e";
    
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