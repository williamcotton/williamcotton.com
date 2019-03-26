const React = require('react');
const ReactDOM = require('react-dom');
const h = require('react-hyperscript');

const appLayout = require('../../components/layout');

const localFetchCache = {};

const isSimpleGet = (input, init) => input && typeof input === 'string' && !init;

module.exports = ({ app, fetch, fetchCache, getElementById }) => (req, res, next) => {
  const Link = props => {
    const onClick = e => {
      e.preventDefault();
      app.navigate(e.target.href);
    };
    const mergedProps = Object.assign({ onClick }, props);
    return h('a', mergedProps);
  };

  res.Link = Link;

  res.renderApp = content => {
    const contentWithProps = React.cloneElement(content, { Link });
    ReactDOM.hydrate(h(appLayout, { content: contentWithProps, Link }), getElementById('app'));
    res.send();
  };

  req.fetch = async (input, init) => {
    if (isSimpleGet(input, init)) {
      const cachedData = Object.assign(fetchCache, localFetchCache)[input];
      if (cachedData) {
        return cachedData;
      }
    }
    const response = await fetch(input, init);
    const data = await response.json();
    if (isSimpleGet(input, init)) localFetchCache[input] = data;
    return data;
  };

  next();
};
