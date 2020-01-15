const h = require('react-hyperscript');
const ApplicationController = require('./application-controller');

const Article = require('../views/article');

module.exports = class ArticlesController extends ApplicationController {
  async show(req, res) {
    const { article } = await req.q(
      'query Article($slug: String!) { article(slug: $slug) { title, slug, publishedDate, body } }',
      { slug: req.params.id }
    );

    const { title } = article;

    res.renderComponent(h(Article, { article }), { title });
  }
};
