const h = require('react-hyperscript');
const { useContext } = require('react');

const { RequestContext } = require('../../contexts');

const required = true;

module.exports = () => {
  const {
    Form,
    p: { contact }
  } = useContext(RequestContext);
  const var1 = parseInt(Math.random() * 9 + 1, 10);
  const var2 = parseInt(Math.random() * 9 + 1, 10);
  return h('div.contact', [
    h('h2', 'Contact'),
    h('div.form-container', [
      h(Form, { action: contact.create(), method: 'post' }, [
        h('input', {
          type: 'hidden',
          name: 'answer',
          id: 'answer',
          value: var1 + var2 - 2
        }),
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
        h('label', { htmlFor: 'guess' }, `What is ${var1} + ${var2}?`),
        h('input', {
          type: 'text',
          name: 'guess',
          id: 'guess',
          required
        }),
        h('button.submit', 'Submit')
      ])
    ])
  ]);
};
