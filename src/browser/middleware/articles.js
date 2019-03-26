module.exports = () => (req, res, next) => {
  req.getArticle = async ({ slug }) => {
    const articleEntry = await req.fetch(`/article/${slug}.json`);
    if (articleEntry.error) {
      throw new Error(articleEntry.error);
    } else {
      return articleEntry;
    }
  };

  req.getAllArticles = async () => {
    const articleEntries = await req.fetch(`/articles.json`);
    return articleEntries;
  };

  next();
};
