const h = require('react-hyperscript');
const ApplicationController = require('./application');

const FrontPage = require('../views/front-page');

module.exports = class FrontPageController extends ApplicationController {
  async index(req, res) {
    const { allArticles } = await req.q(
      '{ allArticles { title, slug, publishedDate, body } }'
    );

    res.renderComponent(h(FrontPage, { allArticles }));
  }
};
