const h = require('react-hyperscript');
const { useContext } = require('react');
const ApplicationController = require('../application');

const { RequestContext } = require('../../contexts');

const Review = ({ title, body, likedByUser, id }) => {
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

module.exports = class ReviewsController extends ApplicationController {
  async index(req, res) {
    const { allReviews } = await req.q(
      'query { allReviews { title, body, likedByUser, id } }',
      {},
      { cache: false }
    );

    res.renderComponent(
      h('ol.reviews', [
        allReviews.map(review =>
          h('li', { key: review.id }, [h(Review, review)])
        )
      ])
    );
  }

  async show(req, res) {
    const { review } = await req.q(
      'query Review($id: Int!) { review(id: $id) { title, body, likedByUser, id } }',
      { id: parseInt(req.params.id, 10) },
      { cache: false }
    );
    res.renderComponent(h(Review, review));
  }
};
