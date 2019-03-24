/* global window */

const { fetch } = window;

const universalBrowserApp = require('./app')({ fetch });

universalBrowserApp.listen({}, () => {
  console.log(
    '%cuniversalBrowserApp is running on %s',
    'color:blue; font-size: 6pt',
    window.location.host
  );
});
