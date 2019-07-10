const { graphql } = require('graphql');
const deepmerge = require('deepmerge');
const cleanDeep = require('clean-deep');

const localQueryCache = {};
let initialRequest = true;

const arrayMerge = (oldArray, newArray) => {
  const oldArrayCopy = oldArray.slice(0);
  newArray.forEach(newObj => {
    const oldObjIndex = oldArrayCopy.findIndex(
      oldObj => oldObj.id === newObj.id
    );
    oldArrayCopy[oldObjIndex] = deepmerge(oldArray[oldObjIndex], newObj);
  });
  return oldArrayCopy;
};

module.exports = ({
  fetch,
  queryCache,
  route,
  cacheKey,
  schema,
  rootValue
}) => (req, res, next) => {
  req.q = async (query, variables, options = {}) => {
    const cache = 'cache' in options ? options.cache : true;
    const isMutation = /^mutation/.test(query);
    const key = cacheKey(query, variables);

    const rawLocalQueryResponse = await graphql(
      schema,
      query,
      rootValue,
      null,
      variables
    );

    const localQueryResponse = rawLocalQueryResponse.errors
      ? false
      : cleanDeep(rawLocalQueryResponse);

    const cachedResponse =
      initialRequest || (cache && !initialRequest)
        ? Object.assign(queryCache, localQueryCache)[key]
        : false;

    const localResponse =
      cachedResponse && localQueryResponse && !initialRequest
        ? deepmerge(cachedResponse, localQueryResponse, { arrayMerge })
        : cachedResponse;

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

    const response = localResponse || (await fetchResponse());

    if (cache && !isMutation && !initialRequest) {
      localQueryCache[key] = response;
    }

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
