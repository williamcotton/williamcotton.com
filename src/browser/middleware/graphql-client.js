const localQueryCache = {};

const { route: graphqlRoute, cacheKey: graphqlCacheKey } = require('../../common/graphql');

module.exports = ({ fetch, queryCache }) => (req, res, next) => {
  req.q = async (query, variables) => {
    const cacheKey = graphqlCacheKey(query, variables);
    const cachedResponse = Object.assign(queryCache, localQueryCache)[cacheKey];
    const fetchResponse = async () => {
      const response = await fetch(graphqlRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ query, variables })
      });
      return response.json();
    };
    const response = cachedResponse || (await fetchResponse());
    localQueryCache[cacheKey] = response;
    const { data, errors } = response;
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  };

  next();
};
