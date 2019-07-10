const cacheKey = (query, variables) =>
  `${query}-(${variables ? JSON.stringify(variables) : ''})`;
const route = '/graphql';

module.exports = {
  cacheKey,
  route
};
