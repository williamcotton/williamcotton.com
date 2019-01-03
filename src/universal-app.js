const { createElement: e } = require('react');

module.exports = ({ app }) => {
  app.get('/', (req, { renderApp }) =>
    renderApp(e('div', null, 'Hello World')));

  app.get('/raw-entries/:entryId', async ({ contentfulClient, params: { entryId } }, { renderJSON }) =>
    renderJSON(await contentfulClient.getEntry(entryId)));
  
  return app;
};
