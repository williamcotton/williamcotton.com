const h = require('react-hyperscript');
const ApplicationController = require('./application');

module.exports = class ErrorsController extends ApplicationController {
  async notFound(req, res) {
    const errorMessage = "This page isn't here!";
    res.renderComponent(h('div.error', errorMessage), {
      statusCode: res.statusCode,
    });
  }

  async serverError(req, res) {
    const errorMessage = 'Sorry, something went horribly wrong!';
    res.renderComponent(h('div.error', errorMessage), {
      statusCode: res.statusCode,
    });
  }
};
