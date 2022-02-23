const ApplicationController = require('./application');

module.exports = class ArticlesController extends ApplicationController {
  async show(req, res) {
    const {
      article,
    } = await req.q(
      'query Article($slug: String!) { article(slug: $slug) { title, slug, publishedDate, body, description } }',
      { slug: req.params.id }
    );

    const { title, description } = article;

    res.renderView({ article }, { title, description });
  }
};
