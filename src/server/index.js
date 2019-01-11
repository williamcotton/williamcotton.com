const contentful = require('contentful');

const nodeEnv = process.env.NODE_ENV;
const defaultTitle = process.env.DEFAULT_TITLE;
const port = process.env.PORT || 5000;
const contentfulSpace = process.env.CONTENTFUL_SPACE;
const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const contentfulClient = contentful.createClient({
  space: contentfulSpace,
  accessToken: contentfulAccessToken
});

const universalServerApp = require('./app')({ defaultTitle, contentfulClient });

universalServerApp.listen(port, () => {
  console.log('universalServerApp is running in %s mode on port %s', nodeEnv, port);
});
