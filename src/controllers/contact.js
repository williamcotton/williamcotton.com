const router = require('router')();
const h = require('react-hyperscript');

router.get('/', ({ Form, baseUrl }, { renderApp }) =>
  renderApp(
    h('div.contact', [
      h('h2', 'Contact'),
      h('div.form-container', [
        h(Form, { action: `${baseUrl}/send-email`, method: 'post' }, [
          h('label', { htmlFor: 'name' }, 'Name'),
          h('input', { type: 'text', name: 'name', id: 'name' }),
          h('label', { htmlFor: 'replyToAddress' }, 'Email Address'),
          h('input', { type: 'email', name: 'replyToAddress', id: 'replyToAddress' }),
          h('label', { htmlFor: 'subject' }, 'Subject'),
          h('input', { type: 'text', name: 'subject', id: 'subject' }),
          h('label', { htmlFor: 'body' }, 'Body'),
          h('textarea', { name: 'body', id: 'body' }),
          h('button.submit', 'Submit')
        ])
      ])
    ])
  )
);

router.post('/send-email', async ({ q, body: emailMessage, baseUrl }, { navigate }) => {
  const response = await q(
    'mutation sendEmail($input: EmailMessage) { sendEmail(input: $input) { success } }',
    { input: emailMessage }
  );
  const {
    sendEmail: { success }
  } = response;
  navigate(`${baseUrl}/message-confirmation`, { success });
});

router.get('/message-confirmation', ({ query }, { renderApp }) => {
  const { success } = query;
  const message = success === 'true' ? 'Success!' : 'Sorry, there was an error. Please try again.';
  renderApp(h('div.message-confirmation', message));
});

module.exports = router;
