# <img src='http://i.imgur.com/580vPI2.png' height='50'></a>

Generate beautiful color palettes, even with no prior design experience.

**Full Website: http://palettable.io**

![alt tag](http://i.imgur.com/U1ImIj1.png)

## How It's Made
---
### Client
Tech Used: React, Redux, Webpack, Sass

I tried to make the components are modular as possible so this will be a high level overview of how the data flows throughout the application. If you want to learn more I have several comments in the files containing the actions for Redux as well as several of the React components.

1. On initial load the client queries the `/random` endpoint on the server and receives a random set of 5 colors which is then caches and displays the first in the array.

2. While the user goes through the tutorial, the keyboard events are conditionally blocked based on the current onboarding step using middleware from `redux-thunk`. Aka, they can't dislike a color when the tutorial is telling them to like a color.

3. Once the tutorial is over, the actions `CHANGE_COLOR`, `ADD_COLOR`, and `REMOVE_COLOR` are dispatched based on the key that the user presses.

4. Since the actions are asynchronous, the actions `REQUEST_PALETTE` and `RECEIVED_PALLETE` are dispatched when server is called. The request action blocks all key events and kicks off the searching animation. When received, key events are re-enabled and searching disappears.

5. To make the application as composable as possible, a majority of the components are purely presentational components. The two main container components are `App`, which handles the key events and dispatches the proper actions, and `SyncedColor`, which dispatches the actions whenever a user changes the color either by changing the HEX code or by using the color picker.

#### Challenges and Improvements:

- As long as a user likes the next color shown to them there's no reason to re-query the server to fetch a matching palette. Therefore a palette of 5 colors is always cached and all colors will be pulled from there when a `ADD_COLOR` action is dispatched. Whenever a user removes or dislikes a color the cached palette is invalidated and the server will be queried again. This conditional check for validity is again done using thunks.

- Until the fetched palette has been re-validated all disliked colors are cached and sent back up to the server when it's queried. The server then filters it's response with those cached colors and returns a palette that's guaranteed not to have any colors that have been shown before.

#### Redux State Tree:
![alt tag](http://i.imgur.com/60dsrvo.png)
![alt tag](http://gifyu.com/images/palettable.gif)

### Server
Tech Used: Express

1. Initial call to server is at the `/api/random` endpoint where it will fetch a new random palette from Colourlovers

2. All subsequent calls are made to the `/api/change` endpoint where it will conditionally return a unique array of colors that will be cached on the client.

#### Challenges and Improvements:

- On initial load the server queries Colourlovers' random palette API endpoint and serves that as the initial palette. On all subsequent calls, the server queries the API end point to find palette that contains the second to last color since that one is the one still liked by the user. In the application I give the user to choose *any* color, not just the ones contained in the data from the API. This becomes a problem since if I called the API with a color it doesn't have it will just return no data. To mitigate this and still give the user as much freedom as possible I've employed a bit of witchcraft. If no match is found I take the HEX code and convert it into a string that describes the code, so if a user customizes a color item to a hex code of `#77834B` and no results are found, the server re-queries the API with a search term of ``"moss green"`` instead. This allows us to give the user more accurate match results while still giving them full freedom to customize any color. If no results are found with the search term, it will default back to a random palette.

- All of this is done through Express middleware, where if no results are found the middleware will just call `next()`.
