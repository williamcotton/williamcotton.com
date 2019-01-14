module.exports = ({ app, contentfulClient }) => (req, res, next) => {
  const getArticleFromContentful = async slug => {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.slug[in]': slug
    });
    const firstEntry = entries.items[0];
    if (!firstEntry) {
      throw new Error('ArticleNotFound');
    }
    return firstEntry.fields;
  };
  app.get('/article/:slug.json', async (_req, _res) => {
    const articleEntry = await getArticleFromContentful(_req.params.slug);
    _res.send(articleEntry);
  });
  req.contentfulClient = contentfulClient;
  req.getArticle = async ({ slug }) => {
    let articleEntry;
    try {
      articleEntry = await getArticleFromContentful(slug);
    } catch (error) {
      throw error;
    }
    return articleEntry;
  };
  next();
};
