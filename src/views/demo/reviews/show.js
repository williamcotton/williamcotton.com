const h = require('react-hyperscript');
const { useContext } = require('react');

const { RequestContext } = require('../../../contexts');

module.exports = ({ title, body, likedByUser, id }) => {
  const { Link, Form, baseUrl } = useContext(RequestContext);
  return h('.review', [
    h('.header', [h(Link, { href: `${baseUrl}/${id}` }, title)]),
    h('.body', [h('p', body)]),
    h('.footer', [
      h('div.form-container', [
        h(Form, { action: `${baseUrl}/liked-reviews`, method: 'post' }, [
          h('input', {
            type: 'hidden',
            name: 'liked',
            id: 'liked',
            value: !likedByUser
          }),
          h('input', {
            type: 'hidden',
            name: 'reviewId',
            id: 'reviewId',
            value: id
          }),
          h('button.submit', likedByUser ? 'Unlike' : 'Like')
        ])
      ])
    ])
  ]);
};
