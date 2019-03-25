/* global beforeAll, afterAll, describe, test, expect */

const path = require('path');

const serverHarness = require('./vendor/server-harness')();
const browserHarness = require('./vendor/browser-harness')();

const screenshotsPath = path.join(__dirname, './screenshots');

const universalAppTest = ({ harness }) => {
  let close;
  let get$;

  beforeAll(async () => {
    ({ close, get$ } = await harness.start());
  });

  afterAll(async () => {
    await close();
  });

  test('/', async () => {
    const route = '/';
    const { $text, page, currentRoute, getAttr } = await get$(route);

    const headerText = await $text('h1');
    expect(headerText).toBe('williamcotton.com');

    if (page) {
      await page.screenshot({ path: `${screenshotsPath}/front-page.png`, fullPage: true });

      const [readMoreLink] = await page.$x(".//*[contains(., 'Read More')]/@href");
      const readMoreHref = await getAttr(readMoreLink);
      expect(readMoreHref).toMatch('/articles/the-tyranny-of-the-anonymous');

      await page.click('h2 a');
      await page.waitForNavigation();
      expect(currentRoute()).toBe('/articles/the-tyranny-of-the-anonymous');
    }
  });

  test('/articles/the-tyranny-of-the-anonymous', async () => {
    const route = '/articles/the-tyranny-of-the-anonymous';
    const { $text, page, currentRoute } = await get$(route);

    const articleHeaderText = await $text('h2');
    expect(articleHeaderText).toBe('The Tyranny of the Anonymous');

    const publishedDateText = await $text('.published-date');
    expect(publishedDateText).toBe('March 25th, 2019');

    if (page) {
      await page.screenshot({ path: `${screenshotsPath}/article.png`, fullPage: true });

      await page.click('h1 a');
      await page.waitForNavigation();
      expect(currentRoute()).toBe('/');
    }
  });
};

describe('universalApp', () => {
  describe('server', () => universalAppTest({ harness: serverHarness }));
  describe('browser', () => universalAppTest({ harness: browserHarness }));
});
