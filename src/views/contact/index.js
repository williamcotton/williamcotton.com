const h = require('react-hyperscript');
const { useContext } = require('react');

const { RequestContext } = require('../../contexts');

const required = true;

module.exports = () => {
  const { Form, baseUrl } = useContext(RequestContext);
  return h('div.contact', [
    h('h2', 'Contact'),
    h('div.form-container', [
      h(Form, { action: `${baseUrl}`, method: 'post' }, [
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
  ]);
};
