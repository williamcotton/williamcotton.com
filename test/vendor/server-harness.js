require('dotenv').config();

const cheerio = require('cheerio');
const fetch = require('node-fetch');
const contentful = require('contentful');
const path = require('path');

const serverApp = require('../../src/server/app');

const defaultTitle = 'app-test';
const host = 'localhost';
const port = 8123;
const baseUrl = `http://${host}:${port}`;

const get$ = async _path => {
  const url = baseUrl + _path;
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);
  const $text = selector => $(selector).text();
  return { $text };
};

// TODO: use a development version of contentful so we don't break tests when
// publishing new content.
// That development article should contain every rich text element so we get full code
// coverage:
// contentful-rich-text.js |    48.94 |    54.55 |    28.57 |    45.45 |... 47,48,49,51,59
// also, we should investigate a way to throw an error from contentfulClient.getEntries()
const contentfulSpace = process.env.CONTENTFUL_SPACE;
const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const contentfulClient = contentful.createClient({
  space: contentfulSpace,
  accessToken: contentfulAccessToken
});

const buildDir = path.join(__dirname, '/../../build');

const graphqlSchema = require('../../src/server/graphql-schema')({ contentfulClient });

module.exports = () => {
  const app = serverApp({
    defaultTitle,
    graphqlSchema,
    buildDir
  });

  const start = async () => {
    const server = await app.listen(port);
    const close = async () => server.close();
    return { close, get$, baseUrl };
  };

  return { start };
};
