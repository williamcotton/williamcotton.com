const { graphql } = require('graphql');

const { cacheKey: graphqlCacheKey } = require('../../common/graphql');

module.exports = ({ schema, rootValue }) => (req, res, next) => {
  req.q = async (query, variables) => {
    const cacheKey = graphqlCacheKey(query, variables);
    const response = await graphql(schema, query, rootValue, null, variables);
    res.cacheQuery(cacheKey, response);
    const { data, errors } = response;
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  };
  next();
};
