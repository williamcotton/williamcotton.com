/* global window, document */

const { fetch, fetchCache } = window;

const getElementById = id => document.getElementById(id);

const universalBrowserApp = require('./app')({ fetch, fetchCache, getElementById });

universalBrowserApp.listen({}, () => {
  console.log(
    '%cuniversalBrowserApp is running on %s',
    'color:blue; font-size: 6pt',
    window.location.host
  );
});
