module.exports = () => (req, res, next) => {
  res.clientRequest = {};
  next();
};
