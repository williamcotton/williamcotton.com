const h = require('react-hyperscript');

const Review = require('./show');

module.exports = ({ allReviews }) => {
  return h('ol.reviews', [
    allReviews.map((review) =>
      h('li', { key: review.id }, [h(Review, review)])
    ),
  ]);
};
