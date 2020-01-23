const h = require('react-hyperscript');

const { RequestContext } = require('../../contexts');

const AppLayout = ({ content, req }) => {
  const {
    Link,
    p: { pages, 'front-page': frontPage, contact }
  } = req;
  return h(RequestContext.Provider, { value: req }, [
    h('div.sitewrapper', [
      h('header', [
        h('h1', [h(Link, { href: frontPage.index() }, 'williamcotton.com')]),
        h('nav', [
          h(Link, { href: pages.show({ id: 'about' }) }, 'About'),
          h(Link, { href: pages.show({ id: 'bio' }) }, 'Bio'),
          h(Link, { href: contact.index() }, 'Contact')
        ])
      ]),
      h('div.content', [content]),
      h('footer', [h('pre', [])])
    ])
  ]);
};

module.exports = AppLayout;
