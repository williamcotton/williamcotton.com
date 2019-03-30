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

    expect(await $text('h1')).toBe('williamcotton.com');

    if (page) {
      await page.screenshot({ path: `${screenshotsPath}/front-page.png`, fullPage: true });

      const [readMoreLink] = await page.$x(".//*[contains(., 'Read More')]/@href");
      expect(await getAttr(readMoreLink)).toMatch('/articles/the-tyranny-of-the-anonymous');

      await page.click('h2 a');
      await page.waitForNavigation();
      expect(currentRoute()).toBe('/articles/the-tyranny-of-the-anonymous');
    }
  });

  test('/articles/the-tyranny-of-the-anonymous', async () => {
    const route = '/articles/the-tyranny-of-the-anonymous';

    const { $text, page, currentRoute } = await get$(route);

    expect(await $text('h2')).toBe('The Tyranny of the Anonymous');
    expect(await $text('.published-date')).toBe('March 25th, 2019');

    if (page) {
      await page.screenshot({ path: `${screenshotsPath}/article.png`, fullPage: true });

      await page.click('h1 a');
      await page.waitForNavigation();
      expect(currentRoute()).toBe('/');
    }
  });

  test('/articles/bad-slug', async () => {
    const route = '/articles/bad-slug';

    const { $text, page, currentRoute } = await get$(route);

    expect(await $text('div.error')).toBe("This page isn't here!");

    if (page) {
      await page.screenshot({ path: `${screenshotsPath}/article-error.png`, fullPage: true });

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