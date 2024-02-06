import qs from "qs";

const styleTag = '<link rel="stylesheet" href="/app.css" />';
const scriptTag =
  '<script src="/app.js" type="text/javascript" charset="utf-8"></script>';
const metaViewportTag =
  '<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>';

function renderDocument({
  defaultTitle,
  expressLink,
  renderedContent,
  description,
  title,
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  ${metaViewportTag}
  <title>${title || defaultTitle}</title>
  ${styleTag}
  <meta name="description" content="${description || title || defaultTitle}">
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
}

export default ({ defaultTitle }) =>
  (req, res, next) => {
    req.csrf = req.csrfToken();

    res.expressLink = {
      queryCache: {},
      csrf: req.csrf,
      user: req.user,
      defaultTitle,
    };

    req.renderDocument = ({ renderedContent, title, description }) =>
      renderDocument({
        defaultTitle,
        expressLink: res.expressLink,
        renderedContent,
        title,
        description,
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
