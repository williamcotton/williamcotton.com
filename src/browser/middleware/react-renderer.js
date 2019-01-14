/* global document */
const ReactDOM = require('react-dom');
const h = require('react-hyperscript');

const appLayout = require('../../components/layout');

module.exports = () => (req, res, next) => {
  res.renderApp = content => {
    ReactDOM.hydrate(h(appLayout, { content }), document.getElementById('app'));
  };
  next();
};
