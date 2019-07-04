const localQueryCache = {};

module.exports = ({ fetch, queryCache, route, cacheKey }) => (req, res, next) => {
  req.q = async (query, variables) => {
    const isMutation = /^mutation/.test(query);
    const key = cacheKey(query, variables);
    const cachedResponse = Object.assign(queryCache, localQueryCache)[key];
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
    if (!isMutation) localQueryCache[key] = response;
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
