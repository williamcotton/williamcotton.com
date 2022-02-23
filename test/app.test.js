/* global beforeAll, afterAll, describe, test, expect, jest */
require('dotenv').config();

const path = require('path');
const contentful = require('contentful');
const sendgrid = require('sendgrid');

const serverHarness = require('./vendor/server-harness');
const browserHarness = require('./vendor/browser-harness');

const serverApp = require('../src/server/app');

const screenshotsPath = path.join(__dirname, './screenshots');

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
  accessToken: contentfulAccessToken,
});

const sendgridClient = sendgrid('BOGUS');

const graphqlSchema = require('../src/server/graphql-schema')({
  contentfulClient,
  sendgridClient,
});

const buildDir = path.join(__dirname, '/../build');
const defaultTitle = 'app-test';

const app = serverApp({
  defaultTitle,
  graphqlSchema,
  buildDir,
  sessionSecret: 'test',
  nodeEnv: 'test',
});

const universalAppTest = ({ harness: { start } }) => {
  let close;
  let get$;

  beforeAll(async () => {
    ({ close, get$ } = await start());
  });

  afterAll(async () => {
    await close();
  });

  test('/', async () => {
    const route = '/';

    const { $text, page, currentRoute, getAttr } = await get$(route);

    expect(await $text('h1')).toBe('williamcotton.com');

    if (page) {
      await page.screenshot({
        path: `${screenshotsPath}/front-page.png`,
        fullPage: true,
      });

      const [readMoreLink] = await page.$x(
        ".//*[contains(., 'Read More')]/@href"
      );
      const readMoreUrl = await getAttr(readMoreLink);
      expect(readMoreUrl).toMatch('/articles/');

      await page.click('h2 a');
      await page.waitForNavigation();
      expect(currentRoute()).toBe(readMoreUrl);
    }
  });

  test('/articles/the-tyranny-of-the-anonymous', async () => {
    const route = '/articles/the-tyranny-of-the-anonymous';

    const { $text, page, currentRoute } = await get$(route);

    expect(await $text('h2')).toBe('The Tyranny of the Anonymous');
    expect(await $text('.published-date')).toBe('January 15th, 2019');

    if (page) {
      await page.screenshot({
        path: `${screenshotsPath}/article.png`,
        fullPage: true,
      });

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
      await page.screenshot({
        path: `${screenshotsPath}/article-error.png`,
        fullPage: true,
      });

      await page.click('h1 a');
      await page.waitForNavigation();
      expect(currentRoute()).toBe('/');
    }
  });

  test('/about', async () => {
    const route = '/about';

    const { $text, page, currentRoute } = await get$(route);

    expect(await $text('h2')).toBe('About');

    if (page) {
      await page.screenshot({
        path: `${screenshotsPath}/about.png`,
        fullPage: true,
      });

      await page.click('h1 a');
      await page.waitForNavigation();
      expect(currentRoute()).toBe('/');
    }
  });

  test('/contact', async () => {
    const route = '/contact';

    const { $text, page, currentRoute } = await get$(route);

    expect(await $text('h2')).toBe('Contact');

    if (page) {
      sendgridClient.API = jest
        .fn()
        .mockReturnValue(Promise.resolve({ statusCode: 202 }));

      const name = 'Tester';
      const replyToAddress = 'test@test.com';
      const subject = 'Test Subject';
      const modifiedSubject = `From williamcotton.com: ${subject}`;
      const body = 'Test Body';
      const question = await $text('label[for=guess]');
      const match = question.match(/.*([0-9] \+ [0-9]).*/);
      const guess = eval(match[1], 10).toString(); // eslint-disable-line no-eval

      await page.screenshot({
        path: `${screenshotsPath}/contact.png`,
        fullPage: true,
      });

      await page.type('#name', name);
      await page.type('#replyToAddress', replyToAddress);
      await page.type('#subject', subject);
      await page.type('#body', body);
      await page.type('#guess', guess);
      await page.$eval('button.submit', (button) => button.click());

      await page.waitForNavigation();
      await page.screenshot({
        path: `${screenshotsPath}/contact-message-confirmation.png`,
        fullPage: true,
      });

      expect(currentRoute()).toBe('/contact/message-confirmation?success=true');
      expect(sendgridClient.API).toBeCalledWith({
        body: {
          content: [{ type: 'text/plain', value: body }],
          from: { email: replyToAddress, name },
          personalizations: [{ to: [{ email: 'williamcotton@gmail.com' }] }],
          subject: modifiedSubject,
        },
        headers: {},
        host: '',
        method: 'POST',
        path: '/v3/mail/send',
        port: '',
        queryParams: {},
        test: false,
      });
    }
  });

  test('/demo/reviews', async () => {
    const route = '/demo/reviews';

    const { $text, page, currentRoute, baseUrl } = await get$(route);

    if (page) {
      await page.screenshot({
        path: `${screenshotsPath}/demo-reviews.png`,
        fullPage: true,
      });

      const likeButtonSelector =
        'form[action="/demo/reviews/liked-reviews"] button.submit';

      expect(await $text(likeButtonSelector)).toBe('Unlike');
      await page.click(likeButtonSelector);
      await page.waitForResponse(`${baseUrl}/graphql`); // mutation
      await page.waitForResponse(`${baseUrl}/graphql`); // query
      expect(await $text(likeButtonSelector)).toBe('Like');

      await page.click('a[href="/demo/reviews/1"');
      await page.waitForNavigation();
      expect(currentRoute()).toBe('/demo/reviews/1');
      await page.screenshot({
        path: `${screenshotsPath}/demo-reviews-1.png`,
        fullPage: true,
      });
      expect(await $text(likeButtonSelector)).toBe('Like');
      await page.click(likeButtonSelector);

      const mutationResponse = await page.waitForResponse(`${baseUrl}/graphql`);
      const postData = JSON.parse(mutationResponse.request().postData());
      const { query, variables } = postData;
      expect(query).toBe(
        'mutation likeReview($input: LikedReview) { likeReview(input: $input) { success } }'
      );
      expect(variables.input.liked).toEqual(true);
      expect(variables.input.reviewId).toEqual(1);

      const queryResponse = await page.waitForResponse(`${baseUrl}/graphql`);
      const queryData = await queryResponse.json();
      expect(queryData.data.review.id).toEqual(1);
      expect(queryData.data.review.likedByUser).toEqual(true);

      expect(await $text(likeButtonSelector)).toBe('Unlike');

      await page.goBack();
      expect(currentRoute()).toBe('/demo/reviews');
      expect(await $text(likeButtonSelector)).toBe('Unlike');
    }
  });
};

describe('universalApp', () => {
  describe('server', () => universalAppTest({ harness: serverHarness(app) }));
  describe('browser', () => universalAppTest({ harness: browserHarness(app) }));
});
