const router = require('router')();
const h = require('react-hyperscript');
const { useContext } = require('react');

const { GlobalContext } = require('../../contexts');

const Review = ({ title, body, likedByUser, id }) => {
  const { Link, Form, baseUrl } = useContext(GlobalContext);
  return h('.review', [
    h('.header', [h(Link, { href: `${baseUrl}/${id}` }, title)]),
    h('.body', [h('p', body)]),
    h('.footer', [
      h('div.form-container', [
        h(Form, { action: `${baseUrl}/${id}/like-review`, method: 'post' }, [
          h('input', {
            type: 'hidden',
            name: 'liked',
            id: 'liked',
            value: !likedByUser
          }),
          h('button.submit', likedByUser ? 'Unlike' : 'Like')
        ])
      ])
    ])
  ]);
};

router.get('/', async ({ q }, { renderApp }) => {
  const { allReviews } = await q(
    'query { allReviews { title, body, likedByUser, id } }'
  );

  renderApp(
    h('ol.reviews', [
      allReviews.map(review => h('li', { key: review.id }, [h(Review, review)]))
    ])
  );
});

router.get('/:id', async ({ q, params: { id } }, { renderApp }) => {
  const { review } = await q(
    'query Review($id: Int!) { review(id: $id) { title, body, likedByUser, id } }',
    { id: parseInt(id, 10) }
  );
  renderApp(h(Review, review));
});

router.post(
  '/:id/like-review',
  async ({ q, body, params: { id } }, { redirect }) => {
    const liked = body.liked === 'true';
    await q(
      'mutation likeReview($input: LikedReview) { likeReview(input: $input) { success } }',
      {
        input: {
          liked,
          reviewId: parseInt(id, 10)
        }
      }
    );
    redirect('back');
  }
);

module.exports = router;
