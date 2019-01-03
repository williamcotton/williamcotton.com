const react = require('react');
const e = react.createElement;

module.exports = ({ app }) => {
  app.get('/', (req, { renderApp }) => {
    renderApp(
      e('div', null, 'Hello World'),
    );
  });
  
  return app;
};
