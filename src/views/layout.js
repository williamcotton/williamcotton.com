const React = require('react');
const h = require('react-hyperscript');

const GlobalContext = React.createContext();

const AppLayout = ({ content, Link, globalState }) =>
  h(GlobalContext.Provider, { value: globalState }, [
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

AppLayout.GlobalContext = GlobalContext;

module.exports = AppLayout;
