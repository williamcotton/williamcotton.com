const qs = require('qs');

const styleTag = '<link rel="stylesheet" href="/app.css" />';
const scriptTag =
  '<script src="/app.js" type="text/javascript" charset="utf-8"></script>';
const metaViewportTag =
  '<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>';

const renderDocument = ({ defaultTitle, expressLink }) => ({
  renderedContent,
  title
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  ${metaViewportTag}
  <title>${title || defaultTitle}</title>
  ${styleTag}
</head>
<body>
  <div id="app">${renderedContent}</div>
  <script type="text/javascript" charset="utf-8">
    window.expressLink = ${JSON.stringify(expressLink)};
  </script>
  ${scriptTag}
</body>
</html>
`;

module.exports = ({ defaultTitle }) => (req, res, next) => {
  req.csrf = req.csrfToken();

  res.expressLink = {
    queryCache: {},
    csrf: req.csrf,
    defaultTitle
  };

  req.renderDocument = ({ renderedContent, title }) =>
    renderDocument({ defaultTitle, expressLink: res.expressLink })({
      renderedContent,
      title
    });

  res.navigate = (path, query) => {
    const pathname = query ? `${path}?${qs.stringify(query)}` : path;
    res.redirect(pathname);
  };

  res.redirect = res.redirect.bind(res);

  res.cacheQuery = (key, data) => {
    res.expressLink.queryCache[key] = data;
  };

  next();
};
