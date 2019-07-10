const localQueryCache = {};
let initialRequest = true;

module.exports = ({ fetch, queryCache, route, cacheKey }) => (req, res, next) => {
  req.q = async (query, variables, options = {}) => {
    const cache = options.cache || true;
    const isMutation = /^mutation/.test(query);
    const key = cacheKey(query, variables);
    const cachedResponse =
      initialRequest || cache ? false : Object.assign(queryCache, localQueryCache)[key];
    const fetchResponse = async () => {
      const response = await fetch(route, {
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
    if (cache && !isMutation) localQueryCache[key] = response;
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
    initialRequest = false;
    return data;
  };

  next();
};
