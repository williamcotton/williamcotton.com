/* global document */

const puppeteer = require('puppeteer');
const serverHarnessBuilder = require('./server-harness');

module.exports = app => {
  const serverHarness = serverHarnessBuilder(app);

  const start = async () => {
    const { close: closeServer, baseUrl } = await serverHarness.start();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
      width: 1200,
      height: 1080
    });

    const close = async () => {
      await browser.close();
      await closeServer();
    };

    const get$ = async path => {
      const url = baseUrl + path;
      await page.goto(url, { waitUntil: 'networkidle0' });

      const $text = async selector =>
        page.evaluate(
          /* istanbul ignore next */
          _selector => {
            const element = document.querySelector(_selector);
            return element ? element.innerText : false;
          },
          selector
        );

      const currentRoute = () => page.url().split(baseUrl)[1];

      const findByText = async text => page.$x(`//*[contains(., '${text}')]/@*`);

      const getAttr = async handle => {
        const propertyHandle = await handle.getProperty('value');
        const attr = await propertyHandle.jsonValue();
        return attr;
      };

      return { $text, currentRoute, page, findByText, getAttr };
    };

    return { close, get$ };
  };

  return { start };
};
