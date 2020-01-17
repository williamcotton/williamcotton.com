const h = require('react-hyperscript');

const { RequestContext } = require('../../contexts');

const AppLayout = ({ content, req }) => {
  const { Link } = req;
  return h(RequestContext.Provider, { value: req }, [
    h('div.sitewrapper', [
      h('header', [
        h('h1', [h(Link, { href: '/' }, 'williamcotton.com')]),
        h('nav', [
          h(Link, { href: '/about' }, 'About'),
          h(Link, { href: '/bio' }, 'Bio'),
          h(Link, { href: '/contact' }, 'Contact')
        ])
      ]),
      h('div.content', [content]),
      h('footer', [h('pre', [])])
    ])
  ]);
};

module.exports = AppLayout;
