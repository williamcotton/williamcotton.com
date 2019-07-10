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
    id: Int
    title: String
    body: String
    likedByUser: Boolean
  }

  type Query {
    review(id: Int!): Review
    allReviews: [Review]
  }

  type Mutation {
    likeReview(input: LikedReview): SuccessResponse
  }
`;

const reviews = {};

const schema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers: resolveFunctions
});

module.exports = () => {
  const rootValue = {
    review: async ({ id }) => {
      return Object.assign({}, reviews[id]);
    },

    allReviews: async () => {
      return Object.values(Object.assign({}, reviews));
    },

    likeReview: async ({ input }) => {
      const { reviewId, liked } = input;

      const review = reviews[reviewId] || { id: reviewId };
      review.likedByUser = liked;
      reviews[reviewId] = review;

      return { success: true };
    }
  };

  return {
    schema,
    rootValue
  };
};
