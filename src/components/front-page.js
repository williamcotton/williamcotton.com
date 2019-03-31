const h = require('react-hyperscript');

const { PublishedDate, Header, Body } = require('./article');
const { articleUrl } = require('../common/url');

// TODO: average reading speed of an adult (roughly 265 WPM)

module.exports = ({ allArticles, Link }) =>
  h('div.articles', [
    allArticles.map(({ title, body, slug, publishedDate }) => {
      const href = articleUrl(slug);
      return h('article.article-preview', { key: slug }, [
        h(Header, { title, slug, Link }),
        h(PublishedDate, { publishedDate }),
        h(Body, { slug, body, Link }),
        h(Link, { href }, 'Read More')
      ]);
    })
  ]);
