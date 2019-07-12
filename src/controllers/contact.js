const router = require('router')();
const h = require('react-hyperscript');

const required = true;

router.get('/', ({ Form, baseUrl }, { renderApp }) =>
  renderApp(
    h('div.contact', [
      h('h2', 'Contact'),
      h('div.form-container', [
        h(Form, { action: `${baseUrl}/send-email`, method: 'post' }, [
          h('label', { htmlFor: 'name' }, 'Name'),
          h('input', { type: 'text', name: 'name', id: 'name', required }),
          h('label', { htmlFor: 'replyToAddress' }, 'Email Address'),
          h('input', {
            type: 'email',
            name: 'replyToAddress',
            id: 'replyToAddress',
            required
          }),
          h('label', { htmlFor: 'subject' }, 'Subject'),
          h('input', {
            type: 'text',
            name: 'subject',
            id: 'subject',
            required
          }),
          h('label', { htmlFor: 'body' }, 'Body'),
          h('textarea', { name: 'body', id: 'body', required }),
          h('button.submit', 'Submit')
        ])
      ])
    ])
  )
);

router.post(
  '/send-email',
  async ({ q, body: emailMessage, baseUrl }, { navigate }) => {
    const { name, replyToAddress, subject, body } = emailMessage;
    const response = await q(
      'mutation sendEmail($input: EmailMessage) { sendEmail(input: $input) { success } }',
      { input: { name, replyToAddress, subject, body } }
    );
    const {
      sendEmail: { success }
    } = response;
    navigate(`${baseUrl}/message-confirmation`, { success });
  }
);

router.get('/message-confirmation', ({ query, Link }, { renderApp }) => {
  const { success } = query;
  const message =
    success === 'true'
      ? "Thanks for the message! I'll get back to you promptly."
      : 'Sorry, looks like something went wrong on our end and your email was not sent.';
  renderApp(
    h('div', [
      h('p.message', message),
      h('p', [h(Link, { href: '/' }, 'Back To Front Page')])
    ])
  );
});

module.exports = router;
