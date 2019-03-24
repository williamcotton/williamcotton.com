/* global window */

const universalBrowserApp = require('./app')();

console.log(
  '%cuniversalBrowserApp is running on %s',
  'color:blue; font-size: 6pt',
  window.location.host
);

universalBrowserApp.listen({ interceptClicks: false });
