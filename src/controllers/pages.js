const ApplicationController = require('./application');

module.exports = class PagesController extends ApplicationController {
  async show(req, res) {
    const {
      page
    } = await req.q(
      'query Page($slug: String!) { page(slug: $slug) { title, slug, body } }',
      { slug: req.params.id }
    );
    const { title } = page;
    res.renderView({ page }, { title });
  }
};
