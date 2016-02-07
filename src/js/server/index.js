require('node-jsx').install({extension: '.jsx'})

var nodeEnv = process.env.NODE_ENV
var defaultTitle = process.env.DEFAULT_TITLE
var userAuthConnectionUrl = process.env.DATABASE_URL
var bookshelfConnection = process.env.DATABASE_URL
var port = process.env.PORT || 5000
var sendgridUsername = process.env.SENDGRID_USERNAME
var sendgridPassword = process.env.SENDGRID_PASSWORD

var sendgrid = require('sendgrid')(sendgridUsername, sendgridPassword)

var rsaPrivateKeyPem = process.env.USER_AUTH_PRIVATE_KEY
var rsaPublicKeyPem = process.env.USER_AUTH_PUBLIC_KEY

var emailService = {
  sendVerificationUrl: function (options, callback) {
    var emailAddress = options.emailAddress
    var verificationUrl = options.verificationUrl
    var payload = {
      to: emailAddress,
      from: 'admin@williamcotton.com',
      subject: 'Email Verification',
      text: 'Thanks for signing up with <a href="http://williamcotton.com">williamcotton.com</a>. \n\nPlease visit this link to complete your account creation: \n\n' + verificationUrl
    }
    if (nodeEnv === 'development') {
      console.log(payload)
    } else {
      sendgrid.send(payload, callback)
    }
    callback(false, payload)
  },
  sendResetPasswordUrl: function (options, callback) {
    var emailAddress = options.emailAddress
    var resetPasswordUrl = options.resetPasswordUrl
    var payload = {
      to: emailAddress,
      from: 'admin@williamcotton.com',
      subject: 'Password Reset',
      text: 'We received a request to change your password with <a href="http://williamcotton.com">williamcotton.com</a>. \n\nPlease visit this link to set your new password: \n\n' + resetPasswordUrl
    }
    if (nodeEnv === 'development') {
      console.log(payload)
    } else {
      sendgrid.send(payload, callback)
    }
    callback(false, payload)
  }
}

var knex = require('knex')({
  client: 'pg',
  debug: false,
  connection: bookshelfConnection
})

var bookshelf = require('bookshelf')(knex)

var userAuthenticationDataStore = require('../lib/expect-postgres-user-authentication-data-store')({
  connection: userAuthConnectionUrl
})

var universalServerApp = require('./app')({
  port: port,
  defaultTitle: defaultTitle,
  nodeEnv: nodeEnv,
  userAuthenticationDataStore: userAuthenticationDataStore,
  rsaPrivateKeyPem: rsaPrivateKeyPem,
  rsaPublicKeyPem: rsaPublicKeyPem,
  emailService: emailService,
  bookshelf: bookshelf
})

universalServerApp.listen(port, function () {
  console.log('universalServerApp is running in %s mode on port %s', nodeEnv, port)
})
