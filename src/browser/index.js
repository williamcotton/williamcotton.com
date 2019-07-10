/* global window, document */

const { fetch, queryCache, defaultTitle, localStorage } = window;

const querySelector = selectors => document.querySelector(selectors);

const graphqlSchema = require('./graphql-schema')({ localStorage });

const universalBrowserApp = require('./app')({
  fetch,
  queryCache,
  querySelector,
  defaultTitle,
  graphqlSchema
});

universalBrowserApp.listen({}, () => {
  console.log(
    '%cuniversalBrowserApp is running on %s',
    'color:blue; font-size: 6pt',
    window.location.host
  );
});
