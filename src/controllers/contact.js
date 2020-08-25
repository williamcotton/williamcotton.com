const ApplicationController = require('./application');

module.exports = class ContactController extends ApplicationController {
  async index(req, res) {
    res.renderView();
  }

  async create(req, res) {
    const { name, replyToAddress, subject, body, answer, guess } = req.body;

    console.log({
      answer,
      guess
    });

    if (parseInt(answer, 10) !== parseInt(guess - 2, 10)) {
      return res.navigate(`${req.baseUrl}/message-confirmation`, {
        success: false
      });
    }

    const response = await req.q(
      'mutation sendEmail($input: EmailMessage) { sendEmail(input: $input) { success } }',
      { input: { name, replyToAddress, subject, body } }
    );
    const {
      sendEmail: { success }
    } = response;
    return res.navigate(`${req.baseUrl}/message-confirmation`, { success });
  }

  async show(req, res) {
    const { success } = req.query;
    res.renderView({ success });
  }
};
