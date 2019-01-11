const h = require('react-hyperscript');

const ContentfulEntry = require('./components/contentful-entry');

module.exports = ({ app }) => {
  app.get('/', (req, { renderApp }) =>
    renderApp(h('div', 'Hello World'), { title: 'Hello World' })
  );

  app.get(
    '/raw-entries/:entryId',
    async ({ contentfulClient, params: { entryId } }, { renderJSON }) =>
      renderJSON(await contentfulClient.getEntry(entryId))
  );

  app.get(
    '/rendered-entries/:entryId',
    async ({ contentfulClient, params: { entryId } }, { renderApp }) => {
      try {
        const entry = await contentfulClient.getEntry(entryId);
        const { title, body } = entry.fields;
        renderApp(h(ContentfulEntry, { title, body }), { title });
      } catch (error) {
        renderApp(h('div', JSON.stringify(error)));
      }
    }
  );

  return app;
};
