module.exports = ({ fetch }) => (req, res, next) => {
  req.getArticle = async ({ slug }) => {
    const response = await fetch(`/article/${slug}.json`);
    const articleEntry = response.json();
    return articleEntry;
  };
  req.getAllArticles = async () => {
    const response = await fetch(`/articles.json`);
    const articleEntries = response.json();
    return articleEntries;
  };
  next();
};
