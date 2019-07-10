const router = require('router')();
const h = require('react-hyperscript');

router.get('/:id', async ({ q, params: { id }, Form, baseUrl }, { renderApp }) => {
  const { review } = await q(
    'query Review($id: Int!) { review(id: $id) { title, body, likedByUser } }',
    { id: parseInt(id, 10) },
    { cache: false }
  );
  const { title, body, likedByUser } = review;
  renderApp(
    h('.review', [
      h('.header', [h('h4', title)]),
      h('.body', [h('p', body)]),
      h('.footer', [
        h('div.form-container', [
          h(Form, { action: `${baseUrl}/${id}/like-review`, method: 'post' }, [
            h('input', { type: 'hidden', name: 'liked', id: 'liked', value: !likedByUser }),
            h('button.submit', likedByUser ? 'Unlike' : 'Like')
          ])
        ])
      ])
    ])
  );
});

router.post('/:id/like-review', async ({ q, body, params: { id } }, { redirect }) => {
  const liked = body.liked === 'true';
  await q('mutation likeReview($input: LikedReview) { likeReview(input: $input) { success } }', {
    input: {
      liked,
      reviewId: parseInt(id, 10)
    }
  });
  redirect('back');
});

module.exports = router;
