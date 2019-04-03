const router = require('router')();
const h = require('react-hyperscript');
const e = require('../vendor/async-error');

const FrontPage = require('../views/front-page');

router.get(
  '/',
  e(async ({ q }, { renderApp }) => {
    const { allArticles } = await q('{ allArticles { title, slug, publishedDate, body } }');
    renderApp(h(FrontPage, { allArticles }));
  })
);

module.exports = router;
