import { graphql } from 'graphql';

class HTTPError extends Error {
  constructor(statusCode, ...params) {
    super(...params);
    this.name = 'HTTPError';
    this.statusCode = statusCode;
  }
}

const cacheKey = (source, variableValues) =>
  `${source}-(${variableValues ? JSON.stringify(variableValues) : ""})`;

export default ({ schema, rootValue }) =>
  (req, res, next) => {
    req.gql = async (source, variableValues) => {
      const isMutation = /^mutation/.test(source);
      const key = cacheKey(source, variableValues);
      const contextValue = req;
      const response = await graphql({ schema, source, rootValue, contextValue, variableValues });
      if (!isMutation) res.cacheQuery(key, response);
      const { data, errors } = response;
      if (errors) {
        const statusCode = errors[0].message === "NotFound" ? 404 : 500;
        throw new HTTPError(statusCode, errors[0].message);
      }
      req.dataQuery = {
        data,
        errors,
        source,
        variableValues,
      };
      return data;
    };
    next();
  };