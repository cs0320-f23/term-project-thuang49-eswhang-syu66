
# Amplify
Amplify allows users to randomly generate custom Spotify playlists based on a set of specifications like danceability, valence, etc, in addition to reference (seed) tracks, genres, and artists. It exists to more easily enable users to discover new music, refresh users' music selection when their own playlists get overplayed, and generate music based on more specific specifications. 

### Team Members: 
syu66 - 30 hours, eswhang - 30 hours, thuang49 - 30 hours

### Total Time: 
~90 hours

### Repo Link: 
https://github.com/cs0320-f23/term-project-thuang49-eswhang-syu66

### Setup and Dependencies:
These are all of the dependencies and libraries we used in this project
* Inside the ```back``` directory: 
    * ```npm install -g ts-node```
    * ```npm install @types/node @types/express --save-dev```
    * ```npm install --save-dev @types/cors```
* inside the ```front``` directory:
    * ```npm install vite```
    * ```npm i --save-dev @types/react-transition-group```
    * ```npm install react-router-dom```
    * ```npm install react-icons```
    * ```npm install playwright```
    * ```npx playwright install```
    * ```npm install @playwright/test``` important!
    * ```npm install dom-to-image```

### Running the App:
* ```cd front```
* ```npm run dev```
* navigate to ```localhost:8000```


### Testing: 
* ```cd front```
* ```npx test```
* Note: Automated testing is not as robust on this project, given the amount of manual testing we'd already done while building the app itself. This is something we intend to build upon in future sprints.

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
* This form enables a more uniformed approach to handling data on the frontend. 

### Credits: 
* Server boilerplate taken from [dev.to](https://dev.to/wizdomtek/typescript-express-building-robust-apis-with-nodejs-1fln )
* [Spotify API Documentation](https://developer.spotify.com/documentation/web-api)
* [Figma Prototype (by Tiffany Huang)](https://www.figma.com/file/zJx5usW7UXk8lhYiDpjEBC/Amplify-%2F-CS0320-Final?type=design&node-id=27%3A2110&mode=design&t=JyTCfCkOkXl0vtGG-1)
* Patrick Ortiz (project-mentor)
