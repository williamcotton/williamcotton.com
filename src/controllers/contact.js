const h = require('react-hyperscript');
const ApplicationController = require('./application-controller');

const required = true;

module.exports = class ContactController extends ApplicationController {
  async index(req, res) {
    return res.renderComponent(
      h('div.contact', [
        h('h2', 'Contact'),
        h('div.form-container', [
          h(req.Form, { action: `${req.baseUrl}`, method: 'post' }, [
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
    );
  }

  async create(req, res) {
    const { name, replyToAddress, subject, body } = req.body;
    const response = await req.q(
      'mutation sendEmail($input: EmailMessage) { sendEmail(input: $input) { success } }',
      { input: { name, replyToAddress, subject, body } }
    );
    const {
      sendEmail: { success }
    } = response;
    res.navigate(`${req.baseUrl}/message-confirmation`, { success });
  }

  async show(req, res) {
    const { success } = req.query;
    const message =
      success === 'true'
        ? "Thanks for the message! I'll get back to you promptly."
        : 'Sorry, looks like something went wrong on our end and your email was not sent.';
    res.renderComponent(
      h('div', [
        h('p.message', message),
        h('p', [h(req.Link, { href: '/' }, 'Back To Front Page')])
      ])
    );
  }
};
