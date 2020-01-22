const contentful = require('contentful');
const sendgrid = require('sendgrid');
const path = require('path');

const nodeEnv = process.env.NODE_ENV;
const defaultTitle = process.env.DEFAULT_TITLE;
const port = process.env.PORT || 5000;
const contentfulSpace = process.env.CONTENTFUL_SPACE;
const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const sendgridApiKey = process.env.SENDGRID_API_KEY;
const sessionSecret = process.env.SESSION_SECRET;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubSecret = process.env.GITHUB_SECRET;

const contentfulClient = contentful.createClient({
  space: contentfulSpace,
  accessToken: contentfulAccessToken
});

const sendgridClient = sendgrid(sendgridApiKey);

const graphqlSchema = require('./graphql-schema')({
  contentfulClient,
  sendgridClient
});

const buildDir = path.join(__dirname, '/../../build');

const universalServerApp = require('./app')({
  defaultTitle,
  graphqlSchema,
  buildDir,
  nodeEnv,
  sessionSecret,
  githubClientId,
  githubSecret
});

universalServerApp.listen(port, () => {
  console.log(
    'universalServerApp is running in %s mode on port %s',
    nodeEnv,
    port
  );
});
