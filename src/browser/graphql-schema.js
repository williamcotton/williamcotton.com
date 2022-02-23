const { buildSchema } = require('graphql/utilities/buildASTSchema');

const schemaString = `
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

const schema = buildSchema(schemaString);

const reviews = {};

module.exports = () => {
  const rootValue = {
    review: async ({ id }) => {
      return reviews[id];
    },

    allReviews: async () => {
      return Object.values(reviews);
    },

    likeReview: async ({ input }) => {
      const { reviewId, liked } = input;

      const review = reviews[reviewId] || { id: reviewId };
      review.likedByUser = liked;
      reviews[reviewId] = review;

      return { success: true };
    },
  };

  return {
    schema,
    rootValue,
  };
};
