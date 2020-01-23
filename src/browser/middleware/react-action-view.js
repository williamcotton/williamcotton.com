/* eslint import/no-dynamic-require:0 global-require:0 */

const h = require('react-hyperscript');

require('../../views/articles/show');
require('../../views/pages/show');
require('../../views/front-page/index');
require('../../views/contact/index');
require('../../views/contact/show');
require('../../views/pages/show');
require('../../views/demo/reviews/index');
require('../../views/demo/reviews/show');

module.exports = () => {
  return (req, res, next) => {
    res.renderView = (params, options) => {
      const { filePath, action } = req.controller;
      const ViewComponent = require(`../../views${filePath}/${action}`);
      const component = h(ViewComponent, params);
      res.renderComponent(component, options);
    };
    next();
  };
};
