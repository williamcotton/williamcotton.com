module.exports = ({ fetch }) => (req, res, next) => {
  req.getArticle = async ({ slug }) => {
    const response = await fetch(`/article/${slug}.json`);
    const articleEntry = response.json();
    return articleEntry;
  };
  next();
};
