const ApplicationController = require('../application');

module.exports = class ReviewsController extends ApplicationController {
  async index(req, res) {
    const { allReviews } = await req.q(
      'query { allReviews { title, body, likedByUser, id } }',
      {},
      { cache: false }
    );

    res.renderView({ allReviews });
  }

  async show(req, res) {
    const { review } = await req.q(
      'query Review($id: Int!) { review(id: $id) { title, body, likedByUser, id } }',
      { id: parseInt(req.params.id, 10) },
      { cache: false }
    );
    res.renderView(review);
  }
};
