const GraphQLJSON = require('graphql-type-json');
const { makeExecutableSchema } = require('graphql-tools');

const resolveFunctions = {
  JSON: GraphQLJSON
};

const schemaString = `
  scalar JSON

  input LikedReview {
    reviewId: Int
    liked: Boolean
  }

  type SuccessResponse {
    success: Boolean
  }

  type Review {
    title: String
    body: String
    likedByUser: Boolean
  }

  type Query {
    review(id: Int!): Review
  }

  type Mutation {
    likeReview(input: LikedReview): SuccessResponse
  }
`;

const reviews = {
  1: {
    likedByUser: false,
    title: 'A great product!',
    body: 'I bought it last week. Tried it out the same day. Works great!'
  }
};

const schema = makeExecutableSchema({ typeDefs: schemaString, resolvers: resolveFunctions });

module.exports = ({ localStorage }) => {
  const rootValue = {
    review: async ({ id }) => {
      return reviews[id];
    },

    likeReview: async ({ input }) => {
      const { reviewId, liked } = input;

      reviews[reviewId].likedByUser = liked;

      return { success: true };
    }
  };

  return {
    schema,
    rootValue
  };
};
