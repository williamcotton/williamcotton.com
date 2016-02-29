var React = require('react')
var ReactBootstrap = require('react-bootstrap')

var ButtonInput = ReactBootstrap.ButtonInput
var Input = ReactBootstrap.Input
var Alert = ReactBootstrap.Alert
var Well = ReactBootstrap.Well

var ResetPassword = React.createClass({
  propTypes: {
    errors: React.PropTypes.array,
    formAction: React.PropTypes.string
  },
  render: function () {
    var formAction = this.props.formAction
    var Form = this.props.Form
    return <div className='reset-password-container'>
      <Well>
        <legend>Reset Password</legend>
        { this.props.expired ? <Alert bsStyle='warning'>Your password reset token has expired. Please start over.</Alert> : false }
        <Form action={formAction} method='post'>
          <p>If you've forgot your password we can send you an e-mail with a link and instruction on how you can set a new password.</p>
          <input type='hidden' name='type' value='email' />
          <Input name='uuid' type='text' label='Email Address' />
          <ButtonInput bsStyle='primary' type='submit' value='Send Reset Password Email' bsSize='large' block />
        </Form>
      </Well>
    </div>
  }
})

module.exports = ResetPassword