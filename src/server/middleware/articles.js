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
    let articleEntry;
    try {
      articleEntry = await getArticleFromContentful(_req.params.slug);
    } catch (error) {
      articleEntry = { error: 'ArticleNotFound' };
    }
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
  const getAllArticlesFromContentful = async () => {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost'
    });
    return entries.items.map(e => e.fields);
  };
  req.getAllArticles = async () => {
    let articleEntires;
    try {
      articleEntires = await getAllArticlesFromContentful();
    } catch (error) {
      throw error;
    }
    return articleEntires;
  };
  app.get('/articles.json', async (_req, _res) => {
    const articleEntires = await getAllArticlesFromContentful();
    _res.send(articleEntires);
  });
  next();
};
