/* global window, document */

const { fetch, queryCache, defaultTitle, localStorage, clientRequest } = window;

const querySelector = selectors => document.querySelector(selectors);

const graphqlSchema = require('./graphql-schema')({ localStorage });

const universalBrowserApp = require('./app')({
  fetch,
  queryCache,
  querySelector,
  defaultTitle,
  graphqlSchema,
  clientRequest
});

universalBrowserApp.listen({}, () => {
  console.log(
    '%cuniversalBrowserApp is running on %s',
    'color:blue; font-size: 6pt',
    window.location.host
  );
});
