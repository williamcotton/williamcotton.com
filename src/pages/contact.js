const router = require('router')();
const h = require('react-hyperscript');

router.get('/', ({ Form }, { renderApp }) => {
  renderApp(
    h('div', [
      h('h2', 'Contact'),
      h(Form, { action: '/contact/submit-message', method: 'post' }, [
        h('input', { type: 'text', name: 'replyTo' })
      ])
    ])
  );
});

router.post('/submit-message', ({ body: { replyTo } }, { renderApp }) => {
  renderApp(h('div', replyTo));
});

module.exports = router;
