const { parse } = require('graphql/language/parser');
const { execute } = require('graphql/execution/execute');
const { validate } = require('graphql/validation/validate');
const deepmerge = require('deepmerge');
const cleanDeep = require('clean-deep');

const localQueryCache = {};
let initialRequest = true;

// merge together any arrays of objects by updating members based on their `id`
const arrayMerge = (oldArray, newArray) => {
  const oldArrayCopy = oldArray.slice(0);
  newArray.forEach(newObj => {
    const oldObjIndex = oldArrayCopy.findIndex(
      oldObj => oldObj.id === newObj.id
    );
    oldArrayCopy[oldObjIndex] = deepmerge(oldArray[oldObjIndex], newObj, {
      arrayMerge
    });
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

    const document = parse(query);

    // a local query response from an optional browser schema, ignoring undefined queries/mutations
    const localQueryResponse =
      !schema || validate(schema, document).length
        ? false
        : cleanDeep(
            await execute(schema, document, rootValue, req, variables),
            {
              emptyArrays: false
            }
          );

    // if it's the initial page request or we're caching the query after further requests, check the server side query cache and the local query cache
    const cachedResponse =
      initialRequest || (cache && !initialRequest)
        ? Object.assign(queryCache, localQueryCache)[key]
        : false;

    // if we've got a local query response and it's not the initial request then deep merge with the cached response
    const localResponse =
      cachedResponse && localQueryResponse && !initialRequest
        ? deepmerge(cachedResponse, localQueryResponse, { arrayMerge })
        : cachedResponse;

    const fetchResponse = async () => {
      const response = await fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRF-Token': req.csrf
        },
        body: JSON.stringify({ query, variables })
      });
      return response.json();
    };

    // if we don't have a local response, fetch from the server
    const response = localResponse || (await fetchResponse());

    // if we're caching and it's not a mutation and not the intial request, then store the response in the local query cache
    if (cache && !isMutation && !initialRequest) {
      localQueryCache[key] = response;
    }

    const { data, errors } = response;

    if (errors) {
      throw new Error(errors[0].message);
    }

    // store the data, errors, query and variables on the request for other interested middleware, eg, event tracking for analytics
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
