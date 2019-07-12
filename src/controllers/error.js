const h = require('react-hyperscript');

module.exports = (error, req, { renderApp }, next) => {
  let errorMessage = 'Sorry, something went horribly wrong!';
  console.error(error);
  let statusCode = 500;
  if (error.message === 'NotFound') {
    errorMessage = "This page isn't here!";
    statusCode = 404;
  }
  renderApp(h('div.error', errorMessage), { statusCode });
  next();
};
