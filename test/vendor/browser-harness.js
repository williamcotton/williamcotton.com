/* global document */

const puppeteer = require('puppeteer');
const serverHarness = require('./server-harness')();

module.exports = () => {
  const start = async () => {
    const { close: closeServer, baseUrl } = await serverHarness.start();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const close = async () => {
      await closeServer();
      await browser.close();
    };

    const get$ = async path => {
      const url = baseUrl + path;
      await page.goto(url, { waitUntil: 'networkidle0' });

      const $text = async selector =>
        page.evaluate(_selector => document.querySelector(_selector).innerText, selector);

      return { $text };
    };

    return { close, get$ };
  };

  return { start };
};
