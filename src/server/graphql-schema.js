const GraphQLJSON = require('graphql-type-json');
const { makeExecutableSchema } = require('graphql-tools');
const helper = require('sendgrid').mail;

const resolveFunctions = {
  JSON: GraphQLJSON
};

const schemaString = `
  scalar JSON

  type Article {
    title: String
    slug: String
    publishedDate: String
    description: String
    body: JSON
  }

  type Page {
    title: String
    slug: String
    body: JSON
  }

  input EmailMessage {
    name: String
    replyToAddress: String
    subject: String
    body: String
  }

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
    allArticles: [Article]
    article(slug: String!): Article
    page(slug: String!): Page
    review(id: Int!): Review
    allReviews: [Review]
  }

  type Mutation {
    sendEmail(input: EmailMessage): SuccessResponse
    likeReview(input: LikedReview): SuccessResponse
  }
`;

const reviews = {
  1: {
    id: 1,
    likedByUser: true,
    title: 'A great product!',
    body: 'I bought it last week. Tried it out the same day. Works great!'
  },

  2: {
    id: 2,
    likedByUser: false,
    title: 'A bad product!',
    body: 'Works bad, I hate it!'
  }
};

const schema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers: resolveFunctions
});

module.exports = ({ contentfulClient, sendgridClient }) => {
  const rootValue = {
    allArticles: async () => {
      const trimBody = fields => {
        const updatedFields = { ...fields };
        updatedFields.body.content = fields.body.content.slice(0, 4);
        return updatedFields;
      };
      const entries = await contentfulClient.getEntries({
        content_type: 'blogPost',
        'fields.hidden': false,
        order: '-fields.publishedDate'
      });
      return entries.items.map(e => trimBody(e.fields));
    },

    article: async ({ slug }) => {
      const entries = await contentfulClient.getEntries({
        content_type: 'blogPost',
        'fields.slug[in]': slug
      });
      const firstEntry = entries.items[0];
      if (!firstEntry) {
        throw new Error('NotFound');
      }
      return firstEntry.fields;
    },

    page: async ({ slug }) => {
      const entries = await contentfulClient.getEntries({
        content_type: 'page',
        'fields.slug[in]': slug
      });
      const firstEntry = entries.items[0];
      if (!firstEntry) {
        throw new Error('NotFound');
      }
      return firstEntry.fields;
    },

    sendEmail: async ({ input }) => {
      const { name, replyToAddress, subject, body } = input;

      const modifiedSubject = `From williamcotton.com: ${subject}`;

      const fromEmail = new helper.Email(replyToAddress, name);
      const toEmail = new helper.Email('williamcotton@gmail.com');
      const content = new helper.Content('text/plain', body);
      const mail = new helper.Mail(
        fromEmail,
        modifiedSubject,
        toEmail,
        content
      );

      const request = sendgridClient.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
      });

      try {
        const response = await sendgridClient.API(request);
        const { statusCode } = response;
        const success = statusCode >= 200 && statusCode < 300;
        return { success };
      } catch (e) {
        return { success: false };
      }
    },

    review: async ({ id }) => {
      return { ...reviews[id] };
    },

    allReviews: async () => {
      return Object.values({ ...reviews });
    },

    likeReview: async ({ input }) => {
      const { reviewId, liked } = input;

      reviews[reviewId].likedByUser = liked;

      return { success: true };
    }
  };

  return {
    schema,
    rootValue,
    graphiql: true
  };
};
