const h = require('react-hyperscript');
const ApplicationController = require('./application');

const Page = require('../views/page');

module.exports = class PagesController extends ApplicationController {
  async show(req, res) {
    const { page } = await req.q(
      'query Page($slug: String!) { page(slug: $slug) { title, slug, body } }',
      { slug: req.params.id }
    );
    const { title } = page;
    res.renderComponent(h(Page, { page }), { title });
  }
};
