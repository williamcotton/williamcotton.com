const { graphql } = require('graphql');

class HTTPError extends Error {
  constructor(statusCode, ...params) {
    super(...params);
    this.name = 'HTTPError';
    this.statusCode = statusCode;
  }
}

module.exports = ({ schema, rootValue, cacheKey }) => (req, res, next) => {
  req.q = async (query, variables) => {
    const isMutation = /^mutation/.test(query);
    const key = cacheKey(query, variables);
    const response = await graphql(schema, query, rootValue, req, variables);
    if (!isMutation) res.cacheQuery(key, response);
    const { data, errors } = response;
    if (errors) {
      const statusCode = errors[0].message === 'NotFound' ? 404 : 500;
      throw new HTTPError(statusCode, errors[0].message);
    }
    req.dataQuery = {
      data,
      errors,
      query,
      variables,
    };
    return data;
  };
  next();
};
