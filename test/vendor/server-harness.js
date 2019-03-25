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

const contentfulSpace = process.env.CONTENTFUL_SPACE;
const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const contentfulClient = contentful.createClient({
  space: contentfulSpace,
  accessToken: contentfulAccessToken
});

const buildDir = path.join(__dirname, '/../../build');
const disableJS = false;

module.exports = () => {
  const app = serverApp({
    defaultTitle,
    contentfulClient,
    disableJS,
    buildDir
  });

  const start = async () => {
    const server = await app.listen(port);
    const close = async () => server.close();
    return { close, get$, baseUrl };
  };

  return { start };
};
