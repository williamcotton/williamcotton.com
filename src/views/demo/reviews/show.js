const h = require('react-hyperscript');
const { useContext } = require('react');

const { RequestContext } = require('../../../contexts');

module.exports = ({ title, body, likedByUser, id }) => {
  const {
    Link,
    Form,
    p: { reviews, 'liked-reviews': likedReviews }
  } = useContext(RequestContext);
  return h('.review', [
    h('.header', [h(Link, { href: reviews.show({ id }) }, title)]),
    h('.body', [h('p', body)]),
    h('.footer', [
      h('div.form-container', [
        h(Form, { action: likedReviews.create(), method: 'post' }, [
          h('input', {
            type: 'hidden',
            name: 'liked',
            value: !likedByUser
          }),
          h('input', {
            type: 'hidden',
            name: 'reviewId',
            value: id
          }),
          h('button.submit', likedByUser ? 'Unlike' : 'Like')
        ])
      ])
    ])
  ]);
};
