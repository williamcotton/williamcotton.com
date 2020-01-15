const router = require('router')();
const h = require('react-hyperscript');
const e = require('../vendor/async-error');

const FrontPage = require('../views/front-page');

router.get(
  '/',
  e(async ({ q }, { renderComponent }) => {
    const { allArticles } = await q(
      '{ allArticles { title, slug, publishedDate, body } }'
    );
    renderComponent(h(FrontPage, { allArticles }));
  })
);

module.exports = router;
