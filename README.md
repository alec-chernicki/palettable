[![Build Status](https://travis-ci.org/alecortega/palettable.svg?branch=master)](https://travis-ci.org/alecortega/palettable)

# <img src='http://i.imgur.com/580vPI2.png' height='50'></a>

Create color palettes using the knowledge of millions of designers.

**Full Website: https://palettable.io**

**Fun fact:** Palettable has 2000 daily unique pageviews, 90% of which are from Japan! 

![alt tag](http://i63.tinypic.com/16iikx4.png)

Palettable is split up into two separate deployables, a web client and a beckend server.

## How to run the application:

Navigate to the client directory and run: `yarn`.

Navigation to the server directory and run: `yarn`.

Navigate to the root directory and run: `yarn start`. This will spin up both the client and the server on the same process.

Run tests with: `yarn test` in either sub-directory.

## Client

### Tech Used: React, Redux, Redux-Observable, Sass

**Why was this stack chosen?**

When a user likes or dislikes, a color a call to Palettable's backend is fired if there are no cached colors left that a user hasn not already liked or disliked. If a user is using the tool fairly quickly this results in a high number of asynchronous calls that all depend on one another and have side effects on client state when they resolve. On top of that, these calls may or may not be fired at all if there are still suggested colors in the cache that a user has not yet seen.

Observables lend themselves well to solving this exact problem by using streams to handle the asynchronous calls and allows a developer to write the outcome of those streams in a very declaritive way. Redux-Observable inject's the current Redux state tree into each Observable function so that we can easily dispatch new events based on the previous state tree.

**Other stacks that were considered:**

Apollo-Client and GraphQL:

Although apollo-client implements Observables under the hood to handle HTTP requests, graph architecture lends itself better to structured data. In Palettable most of the state needed to power the app is on the client. While apollo-client can store client-side data and it great for continuous asynchronous calls, it was difficult to implement side effects as a result of those calls and wasn't the best fit for this use-case.

Redux and Redux-Thunk:

While the current implementation still does use Redux to store client-side state, Redux-Thunk wasn't the greatest fit due to it's imperative style. Handling asynchronous calls and their side effects turned into deeply nested Promises and became very difficult to test and reason about.

### Data Flow:

![alt tag](http://i64.tinypic.com/2z9bb07.png)

When a user likes or dislikes a color the action is sent through the redux-observable middleware and the current cache is checked. If there are still suggested colors cached that the user has not disliked or liked then the color is either changed or a new one is added. Otherwise, all disliked and liked colors are sent to the `/api/palette` endpoint and a new palette is fetched. Once the cache is updated with new colors the color is either changed or a new one is added.

### Redux state tree in action:

![](https://user-images.githubusercontent.com/6596787/44816030-11bc9c00-abaf-11e8-99a7-c0f5d2bede61.gif)

## Server

### Tech Used: Express

**Why was this stack chosen?**

Node is a pretty lightweight server choice and can be spun up fairly easily. We needed a backend that could send a different response based on the result of another controller and the ability to dynamically render a `.png` file. By using Express' built in middleware architecture we could cleanly write fallbacks and we can build images using an API that's very similar to the front-end canvas API.

### Data Flow:

![](https://user-images.githubusercontent.com/6596787/44816092-3d3f8680-abaf-11e8-9245-82c049864ebc.png)

Palettable gives the user the ability to create a palette with _any_ color, but our suggestions are powered by the ColourLovers API so there isn't a human-generated palette for every hex code imaginable. To get around this we search the API using several different methods.

**1. Search by exact hex code**

First, we check if there is a human-generated palette containing the exact hex code we're searching for. We flatten all the palettes returned from the API and if there are 5 colors that have not been previously liked or disliked then we return those back to the client, otherwise we try another method.

**2. Search by exact search term**

If there isn't a palette that matches the exact hex code we want then we employ a bit of witchcraft. We transform the hex code into a string that describes it. For instance the hex code of `#0000FF` may be transformed into the string `"cobalt blue"` and we query the API with that search term. This allows us to query for a palette that resembles the one we're looking for while still giving the user the ability to create a palette with any color they wish to use.

**3. Search for random palette**

If we have exhausted all our options then we return a random palette back to the client.
