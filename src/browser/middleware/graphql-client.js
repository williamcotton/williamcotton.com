const localQueryCache = {};
let initialRequest = true;

class HTTPError extends Error {
  constructor(statusCode, ...params) {
    super(...params);
    this.name = 'HTTPError';
    this.statusCode = statusCode;
  }
}

module.exports = ({ fetch, route, cacheKey }) => (req, res, next) => {
  req.q = async (query, variables, options = {}) => {
    const cache = 'cache' in options ? options.cache : true;
    const isMutation = /^mutation/.test(query);
    const key = cacheKey(query, variables);

    // if it's the initial page request or we're caching the query after further requests, check the server side query cache and the local query cache
    const cachedResponse =
      initialRequest || (cache && !initialRequest)
        ? Object.assign(req.queryCache, localQueryCache)[key]
        : false;

    const fetchResponse = async () => {
      const response = await fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRF-Token': req.csrf,
        },
        body: JSON.stringify({ query, variables }),
      });
      return response.json();
    };

    // if we don't have a cached response, fetch from the server
    const response = cachedResponse || (await fetchResponse());

    // if we're caching and it's not a mutation and not the intial request, then store the response in the local query cache
    if (cache && !isMutation && !initialRequest) {
      localQueryCache[key] = response;
    }

    const { data, errors } = response;

    if (errors) {
      const statusCode = errors[0].message === 'NotFound' ? 404 : 500;
      throw new HTTPError(statusCode, errors[0].message);
    }

    // store the data, errors, query and variables on the request for other interested middleware, eg, event tracking for analytics
    req.dataQuery = {
      data,
      errors,
      query,
      variables,
    };

    initialRequest = false;

    return data;
  };

  next();
};
