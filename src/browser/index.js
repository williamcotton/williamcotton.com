/* global window, document */

const { fetch, queryCache, defaultTitle } = window;

const querySelector = selectors => document.querySelector(selectors);

const universalBrowserApp = require('./app')({ fetch, queryCache, querySelector, defaultTitle });

universalBrowserApp.listen({}, () => {
  console.log(
    '%cuniversalBrowserApp is running on %s',
    'color:blue; font-size: 6pt',
    window.location.host
  );
});
