const { graphql } = require('graphql');

module.exports = ({ schema, rootValue }) => (req, res, next) => {
  req.q = async (query, variables) => {
    const cacheKey = `${query}-(${variables ? JSON.stringify(variables) : ''})`;
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
