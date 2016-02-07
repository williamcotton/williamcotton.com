var React = require('react')
var ReactBootstrap = require('react-bootstrap')
var Alert = ReactBootstrap.Alert
var Well = ReactBootstrap.Well

var ResetPasswordEmailSent = React.createClass({
  propTypes: {
    errors: React.PropTypes.array,
    formAction: React.PropTypes.string
  },
  render: function () {
    return <div className='reset-password-container'>
      <Well>
        <legend>Reset Password Email Sent</legend>
        <Alert bsStyle='success'>Please <strong>check your email</strong> for instructions on how to reset your password.</Alert>
      </Well>
    </div>
  }
})

module.exports = ResetPasswordEmailSent
