import { graphql } from 'graphql';

class HTTPError extends Error {
  constructor(statusCode, ...params) {
    super(...params);
    this.name = 'HTTPError';
    this.statusCode = statusCode;
  }
}

const cacheKey = (query, variables) =>
  `${query}-(${variables ? JSON.stringify(variables) : ""})`;

export default ({ schema, rootValue }) =>
  (req, res, next) => {
    req.gql = async (query, variables) => {
      const isMutation = /^mutation/.test(query);
      const key = cacheKey(query, variables);
      const response = await graphql(schema, query, rootValue, req, variables);
      if (!isMutation) res.cacheQuery(key, response);
      const { data, errors } = response;
      if (errors) {
        const statusCode = errors[0].message === "NotFound" ? 404 : 500;
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