/* global window, document */

const { fetch, queryCache } = window;

const getElementById = id => document.getElementById(id);

const universalBrowserApp = require('./app')({ fetch, queryCache, getElementById });

universalBrowserApp.listen({}, () => {
  console.log(
    '%cuniversalBrowserApp is running on %s',
    'color:blue; font-size: 6pt',
    window.location.host
  );
});
