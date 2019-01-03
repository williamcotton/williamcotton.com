const { createElement: e } = require('react');

module.exports = ({ app }) => {
  app.get('/', (req, { renderApp }) =>
    renderApp(e('div', null, 'Hello World'), { title: 'Hello World' }));

  app.get('/raw-entries/:entryId', async ({ contentfulClient, params: { entryId } }, { renderJSON }) =>
    renderJSON(await contentfulClient.getEntry(entryId)));

  app.get('/rendered-entries/:entryId', async ({ params: { entryId } }, { renderEntry }) =>
    renderEntry(entryId));
  
  return app;
};
