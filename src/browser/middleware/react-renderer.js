const React = require('react');
const ReactDOM = require('react-dom');
const h = require('react-hyperscript');

const appLayout = require('../../components/layout');

module.exports = ({ app, document }) => (req, res, next) => {
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
    ReactDOM.hydrate(
      h(appLayout, { content: contentWithProps, Link }),
      document.getElementById('app')
    );
    res.send();
  };
  next();
};
