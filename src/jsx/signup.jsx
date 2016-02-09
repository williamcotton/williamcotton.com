var React = require('react')
var ReactBootstrap = require('react-bootstrap')

var Input = ReactBootstrap.Input
var ButtonInput = ReactBootstrap.ButtonInput
var Well = ReactBootstrap.Well

var Signup = React.createClass({
  render: function () {
    var passwordMismatch = this.props.errors ? this.props.errors.indexOf('PASSWORD_MISMATCH') > -1 : false
    var passwordTooShort = this.props.errors ? this.props.errors.indexOf('PASSWORD_TOOSHORT') > -1 : false
    var emailInvalid = this.props.errors ? this.props.errors.indexOf('EMAIL_INVALID') > -1 : false
    var emailAlreadyExists = this.props.errors ? this.props.errors.indexOf('UUID_FOR_TYPE_EXISTS') > -1 : false
    var formAction = this.props.formAction
    var Form = this.props.Form
    return <div className='signup-container'>
      <Well>
        <legend>Signup</legend>
        <Form action={formAction} method='post'>
          <input type='hidden' name='type' value='email' />
          <Input bsStyle={ emailInvalid || emailAlreadyExists ? 'error' : null} name='uuid' type='text' label='Email Address' defaultValue={ emailInvalid || emailAlreadyExists ? '' : this.props.uuid} />
          <Input bsStyle={ passwordTooShort ? 'error' : null} name='password' type='password' label='Password' defaultValue={ passwordTooShort ? '' : this.props.password} />
          <Input bsStyle={ passwordMismatch ? 'error' : null} name='repeatPassword' type='password' label='Repeat Password' autoFocus />
          <p><Input type='checkbox' onClick={(e) => { this.setState({checked: e.target.checked}) } } label='I agree to the terms of service.' /></p>
          <ButtonInput bsStyle='primary' type='submit' value='Signup' bsSize='large' block disabled={!this.state.checked} />
        </Form>
      </Well>
    </div>
  },
  propTypes: {
    uuid: React.PropTypes.string,
    password: React.PropTypes.string,
    errors: React.PropTypes.array,
    formAction: React.PropTypes.string
  },
  getInitialState: function () {
    return {
      checked: false
    }
  }
})

module.exports = Signup
