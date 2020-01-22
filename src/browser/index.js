/* global window, document */

const { fetch } = window;

const querySelector = selectors => document.querySelector(selectors);

// const graphqlSchema = require('./graphql-schema')();

const universalBrowserApp = require('./app')({
  fetch,
  querySelector
  // graphqlSchema,
});

universalBrowserApp.listen({}, () => {
  console.log(
    '%cuniversalBrowserApp is running on %s',
    'color:blue; font-size: 6pt',
    window.location.host
  );
});
