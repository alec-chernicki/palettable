export default `
  type Color {
    id: ID!
    hexCode: String!
  }

  type Mutation {
    dislikeColor(id: ID!): [Color]
    likeColor(id: ID!): Color
    removeColor(id: ID!): Color
    hydrateInitialLikedColors: [Colors]
  }

  type Query {
    likedColors: [Color]
    dislikedColors: [Color]
  }
`;
