/* global beforeAll, afterAll, describe, test, expect */

const serverHarness = require('./vendor/server-harness')();
const browserHarness = require('./vendor/browser-harness')();

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
    const path = '/';
    const { $text } = await get$(path);

    const headerText = await $text('h1');
    expect(headerText).toBe('williamcotton.com');
  });

  test('/articles/the-tyranny-of-the-anonymous', async () => {
    const path = '/articles/the-tyranny-of-the-anonymous';
    const { $text } = await get$(path);

    const articleHeaderText = await $text('h2');
    expect(articleHeaderText).toBe('The Tyranny of the Anonymous');

    const publishedDateText = await $text('.published-date');
    expect(publishedDateText).toBe('March 25th, 2019');
  });
};

describe('universalApp', () => {
  describe('server', () => universalAppTest({ harness: serverHarness }));
  describe('browser', () => universalAppTest({ harness: browserHarness }));
});
