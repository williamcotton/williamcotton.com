const router = require('router')();
const h = require('react-hyperscript');
const e = require('../vendor/async-error');

const Article = require('../views/article');

router.get(
  '/:slug',
  e(async ({ q, params: { slug } }, { renderComponent }) => {
    const { article } = await q(
      'query Article($slug: String!) { article(slug: $slug) { title, slug, publishedDate, body } }',
      { slug }
    );
    const { title } = article;
    renderComponent(h(Article, { article }), { title });
  })
);

module.exports = router;
