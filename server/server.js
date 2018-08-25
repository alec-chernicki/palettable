// @flow
const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');
const ColourLoversApi = require('./connectors/ColourLoversApi');

const typeDefs = gql`
  type Color {
    id: ID!
    hexCode: String!
  }

  type Palette {
    id: ID!
    colors: [Color]!
  }

  input ColorInput {
    id: ID
    hexCode: String
  }

  input ColorPreferenceInput {
    likedColors: [ColorInput]
    dislikedColors: [ColorInput]
  }

  type Query {
    palette(input: ColorPreferenceInput): Palette!
  }
`;

const resolvers = {
  Query: {
    palette: (root, args) =>
      ColourLoversApi.getPalette({
        likedColors: args.likedColors,
        dislikedColors: args.likedColors,
      }),
  },
};

// // The GraphQL schema
// const typeDefs = gql`
//   type Query {
//     "A simple type for getting started!"
//     hello: String
//   }
// `;

// // A map of functions which return data for the schema.
// const resolvers = {
//   Query: {
//     hello: () => 'world',
//   },
// };

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Initialize Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect GraphQL to existing Express app and middleware
server.applyMiddleware({ app });

app.get('/api/image/:palette', require('./controllers/imageController'));

// Initialize Express server
app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
