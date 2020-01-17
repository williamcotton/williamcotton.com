const h = require('react-hyperscript');
const { useContext } = require('react');

const { RequestContext } = require('../../contexts');

module.exports = ({ success }) => {
  const { Link } = useContext(RequestContext);
  const message =
    success === 'true'
      ? "Thanks for the message! I'll get back to you promptly."
      : 'Sorry, looks like something went wrong on our end and your email was not sent.';

  return h('div', [
    h('p.message', message),
    h('p', [h(Link, { href: '/' }, 'Back To Front Page')])
  ]);
};
