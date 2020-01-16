const ApplicationController = require('../../application');

module.exports = class LikedReviewsController extends ApplicationController {
  async create(req, res) {
    const liked = req.body.liked === 'true';
    const reviewId = parseInt(req.body.reviewId, 10);
    await req.q(
      'mutation likeReview($input: LikedReview) { likeReview(input: $input) { success } }',
      {
        input: {
          liked,
          reviewId
        }
      }
    );
    res.redirect('back');
  }
};
