const cheerio = require('cheerio');
const fetch = require('node-fetch');

const host = 'localhost';
const port = 8123;
const baseUrl = `http://${host}:${port}`;

const get$ = async (_path) => {
  const url = baseUrl + _path;
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);
  const $text = (selector) => $(selector).text();
  return { $text };
};

module.exports = (app) => {
  const start = async () => {
    const server = await app.listen(port);
    const close = async () => server.close();
    return { close, get$, baseUrl };
  };

  return { start };
};
