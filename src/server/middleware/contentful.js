module.exports = ({ contentfulClient }) => (req, res, next) => {
  req.contentfulClient = contentfulClient;
  req.getArticle = async ({ slug }) => {
    let articleEntry;
    try {
      const entries = await contentfulClient.getEntries({
        content_type: 'blogPost',
        'fields.slug[in]': slug
      });
      const firstEntry = entries.items[0];
      if (!firstEntry) {
        throw new Error('ArticleNotFound');
      }
      articleEntry = firstEntry.fields;
    } catch (error) {
      throw error;
    }
    return articleEntry;
  };
  next();
};
