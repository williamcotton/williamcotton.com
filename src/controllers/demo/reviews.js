const router = require('router')();
const h = require('react-hyperscript');

const Review = ({ title, body, likedByUser, id, Form, baseUrl }) =>
  h('.review', [
    h('.header', [h('h4', title)]),
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

router.get('/', async ({ q, Form, baseUrl }, { renderApp }) => {
  const { allReviews } = await q(
    'query { allReviews { title, body, likedByUser, id } }'
  );

  renderApp(
    h('ol.reviews', [
      allReviews.map(review =>
        h('li', { key: review.id }, [
          h(Review, Object.assign(review, { Form, baseUrl }))
        ])
      )
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
