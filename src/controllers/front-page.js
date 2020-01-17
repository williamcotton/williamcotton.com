const ApplicationController = require('./application');

module.exports = class FrontPageController extends ApplicationController {
  async index(req, res) {
    const { allArticles } = await req.q(
      '{ allArticles { title, slug, publishedDate, body } }'
    );
    res.renderView({ allArticles });
  }
};
