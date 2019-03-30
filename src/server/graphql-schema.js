const GraphQLJSON = require('graphql-type-json');
const { makeExecutableSchema } = require('graphql-tools');

const resolveFunctions = {
  JSON: GraphQLJSON
};

const schemaString = `
  scalar JSON

  type Article {
    title: String
    slug: String
    publishedDate: String
    body: JSON
  }

  type Page {
    title: String
    slug: String
    body: JSON
  }

  type Query {
    allArticles: [Article]
    article(slug: String!): Article
    page(slug: String!): Page
  }
`;

const schema = makeExecutableSchema({ typeDefs: schemaString, resolvers: resolveFunctions });

module.exports = ({ contentfulClient }) => {
  const rootValue = {
    allArticles: async () => {
      const trimBody = fields => {
        const updatedFields = Object.assign({}, fields);
        updatedFields.body.content = fields.body.content.slice(0, 4);
        return updatedFields;
      };
      const entries = await contentfulClient.getEntries({
        content_type: 'blogPost'
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
    }
  };

  return {
    schema,
    rootValue,
    graphiql: true
  };
};
