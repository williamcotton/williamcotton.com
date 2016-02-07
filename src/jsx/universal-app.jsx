var React = require('react')

var FrontPage = require('./front-page.jsx')
var About = require('./about.jsx')
var Signup = require('./signup.jsx')
var Welcome = require('./welcome.jsx')
var Login = require('./login.jsx')
var ResetPassword = require('./reset-password.jsx')
var NewPassword = require('./new-password.jsx')
var ResetPasswordEmailSent = require('./reset-password-email-sent.jsx')

var universalApp = (options) => {
  var app = options.app

  app.get('/', (req, res) => {
    var content = <FrontPage />
    res.renderApp(content)
  })

  /*
    Footer
    ------
  */

  app.get('/about', (req, res) => {
    var content = <About />
    res.renderApp(content, {title: 'About'})
  })

  /*
    User Authentication
    -------------------
  */

  require('../js/lib/expect-universal-user-authentication')({
    app: app,
    login: { component: Login, successRedirect: '/welcome' },
    signup: { component: Signup, successRedirect: '/welcome' },
    logout: { successRedirect: '/' },
    resetPassword: { component: ResetPassword, successComponent: ResetPasswordEmailSent },
    newPassword: { component: NewPassword }
  })

  var userRequired = (req, res, next) => {
    if (!req.user) {
      var content = <h2>Login Required!</h2>
      return res.renderApp(content, {title: 'Login Required'})
    }
    next()
  }

  app.get('/welcome', userRequired, (req, res) => {
    var content = <Welcome />
    res.renderApp(content, {title: 'Welcome'})
  })

  return app
}

module.exports = universalApp
