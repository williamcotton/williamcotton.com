module.exports = ({ contentfulClient }) => (req, res, next) => {
  req.contentfulClient = contentfulClient;
  next();
};
