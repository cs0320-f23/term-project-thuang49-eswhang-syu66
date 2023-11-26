# term-project-thuang49-eswhang-syu66--

# Amplify
Amplify allows users to randomly generate Spotify playlists based on a set of specifications like danceability, valence, etc. 

### Setup:
* Inside the ```backend``` directory: 
    * ```npm install -g ts-node```
    * ```npm install @types/node @types/express --save-dev```
    * ```npm install --save-dev @types/cors```
* inside the ```front``` directory:
    * ```npm install vite```
    * ```npm i --save-dev @types/react-transition-group```
    * ```npm install react-router-dom```

### Form: 
* All responses from the backend will be served as type ```Response``` that is either
a ```successResponse``` or an ```errorResponse```
    * ```successResponse```:
        * ```status```
        * ```data```
    * ```errorResponse```
        *  ```status```
        *  ```error_type```
        * ```error_message```
*
#### Credits: 
* Server boilerplate taken from [dev.to](https://dev.to/wizdomtek/typescript-express-building-robust-apis-with-nodejs-1fln )
* [Spotify API Documentation](https://developer.spotify.com/documentation/web-api)