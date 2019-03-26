const trimBody = fields => {
  const updatedFields = Object.assign({}, fields);
  updatedFields.body.content = fields.body.content.slice(0, 3);
  return updatedFields;
};

module.exports = ({ app, contentfulClient }) => {
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

  const getAllArticlesFromContentful = async () => {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost'
    });
    return entries.items.map(e => trimBody(e.fields));
  };

  app.get('/article/:slug.json', async (req, res) => {
    let articleEntry;
    try {
      articleEntry = await getArticleFromContentful(req.params.slug);
    } catch (error) {
      articleEntry = { error: error.message };
    }
    res.send(articleEntry);
  });

  app.get('/articles.json', async (req, res) => {
    const articleEntires = await getAllArticlesFromContentful();
    res.send(articleEntires);
  });

  return (req, res, next) => {
    req.contentfulClient = contentfulClient;

    req.getArticle = async ({ slug }) => {
      let articleEntry;
      try {
        articleEntry = await getArticleFromContentful(slug);
      } catch (error) {
        articleEntry = { error: error.message };
        throw error;
      } finally {
        res.cacheFetch(`/article/${slug}.json`, articleEntry);
      }
      return articleEntry;
    };

    req.getAllArticles = async () => {
      let articleEntires;
      try {
        articleEntires = await getAllArticlesFromContentful();
      } catch (error) {
        throw error;
      }
      res.cacheFetch(`/articles.json`, articleEntires);
      return articleEntires;
    };

    next();
  };
};
