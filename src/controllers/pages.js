const router = require('router')();
const h = require('react-hyperscript');
const e = require('../vendor/async-error');

const Page = require('../views/page');

router.get(
  '/:slug',
  e(async ({ q, params: { slug } }, { renderComponent }) => {
    const { page } = await q(
      'query Page($slug: String!) { page(slug: $slug) { title, slug, body } }',
      { slug }
    );
    const { title } = page;
    renderComponent(h(Page, { page }), { title });
  })
);

module.exports = router;
