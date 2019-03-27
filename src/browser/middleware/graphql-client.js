const localQueryCache = {};

module.exports = ({ fetch, queryCache }) => (req, res, next) => {
  req.q = async (query, variables) => {
    const cacheKey = `${query}-(${variables ? JSON.stringify(variables) : ''})`;
    const cachedResponse = Object.assign(queryCache, localQueryCache)[cacheKey];
    const fetchResponse = async () => {
      const response = await fetch('/graphql', {
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
