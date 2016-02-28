var React = require('react')

var FrontPage = require('./front-page.jsx')

// Articles
var IntroToExpect = require('./articles/intro-to-expect.jsx')
var FromWeb20ToWeb2016 = require('./articles/from-web-2.0-to-web-2016.jsx')

// Personified Nouns
var PersonifiedNouns = require('./personified-nouns/personified-nouns.jsx')
var UltimateTruth = require('./personified-nouns/ultimate-truth.jsx')

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
    Articles
    --------
  */

  app.get('/intro-to-expect', (req, res) => {
    var content = <IntroToExpect />
    res.renderApp(content)
  })

  app.get('/from-web-2.0-to-web-2016', (req, res) => {
    var content = <FromWeb20ToWeb2016 />
    res.renderApp(content)
  })

  /*
    Personified Nouns
    -----------------
  */

  app.get('/personified-nouns', (req, res) => {
    var content = <PersonifiedNouns />
    res.renderApp(content)
  })

  app.get('/ultimate-truth', (req, res) => {
    var content = <UltimateTruth />
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
