const { graphql } = require('graphql');

module.exports = ({ schema, rootValue, cacheKey }) => (req, res, next) => {
  req.q = async (query, variables) => {
    const isMutation = /^mutation/.test(query);
    const key = cacheKey(query, variables);
    const response = await graphql(schema, query, rootValue, null, variables);
    if (!isMutation) res.cacheQuery(key, response);
    const { data, errors } = response;
    if (errors) {
      throw new Error(errors[0].message);
    }
    req.dataQuery = {
      data,
      errors,
      query,
      variables
    };
    return data;
  };
  next();
};
