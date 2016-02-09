var React = require('react')
var ReactBootstrap = require('react-bootstrap')

var Input = ReactBootstrap.Input
var ButtonInput = ReactBootstrap.ButtonInput
var Alert = ReactBootstrap.Alert
var Well = ReactBootstrap.Well

var Login = React.createClass({
  propTypes: {
    error: React.PropTypes.object,
    uuid: React.PropTypes.string,
    formAction: React.PropTypes.string,
    updatePasswordSuccess: React.PropTypes.string
  },
  render: function () {
    var error = this.props.error
    var updatePasswordSuccess = this.props.updatePasswordSuccess
    var formAction = this.props.formAction
    var Form = this.props.Form
    return <div className='login-container'>
      <Well>
        <legend>Login</legend>
        { updatePasswordSuccess ? <Alert bsStyle='success'>You have successfully reset your password.</Alert> : false }
        <Form action={formAction} method='post'>
          <input type='hidden' name='type' value='email' />
          <Input name='uuid' type='text' label='Email Address' defaultValue={this.props.uuid} />
          <Input bsStyle={ error ? 'error' : null} name='password' type='password' label='Password' />
          <p><a href='/reset-password'>Forgot Password?</a></p>
          <ButtonInput bsStyle='primary' type='submit' value='Login' bsSize='large' block />
          <p>Need an account? <a href='/signup'>Sign up now.</a></p>
        </Form>
      </Well>
    </div>
  }
})

module.exports = Login
