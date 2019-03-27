const React = require('react');
const { renderToString } = require('react-dom/server');
const h = require('react-hyperscript');
const appLayout = require('../../components/layout');

const styleTag = '<link rel="stylesheet" href="/app.css" />';
const scriptTag = '<script src="/app.js" type="text/javascript" charset="utf-8"></script>';

const htmlTemplate = ({ renderedContent, title, queryCache }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  ${styleTag}
  <script type="text/javascript" charset="utf-8">
    window.queryCache = ${JSON.stringify(queryCache)};
  </script>
</head>
<body>
  <div id="app">${renderedContent}</div>
  ${scriptTag}
</body>
</html>
`;

const Link = props => h('a', props);

module.exports = ({ defaultTitle }) => (req, res, next) => {
  res.queryCache = {};

  res.renderApp = (content, options = {}) => {
    // TODO: only add Link if it is a React component not a just a DOM element
    // Warning: React does not recognize the `Link` prop on a DOM element. If you intentionally want it to
    // appear in the DOM as a custom attribute, spell it as lowercase `link` instead. If you accidentally
    // passed it from a parent component, remove it from the DOM element.
    const contentWithProps = React.cloneElement(content, { Link });
    const renderedContent = renderToString(h(appLayout, { content: contentWithProps, Link }));
    const title = options.title || defaultTitle;
    const statusCode = options.statusCode || 200;
    const { queryCache } = res;
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(htmlTemplate({ renderedContent, title, queryCache }));
  };

  res.cacheQuery = (route, data) => {
    res.queryCache[route] = data;
  };

  res.Link = Link;

  next();
};
