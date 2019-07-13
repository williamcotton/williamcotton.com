const h = require('react-hyperscript');
const { useContext } = require('react');

const { RequestContext } = require('../contexts');

const { PublishedDate, Header, Body } = require('./article');
const { articleUrl } = require('../common/url');

// TODO: average reading speed of an adult (roughly 265 WPM)

module.exports = ({ allArticles }) => {
  const { Link } = useContext(RequestContext);
  return h('div.front-page', [
    allArticles.map(({ title, body, slug, publishedDate }) => {
      const href = articleUrl(slug);
      return h('article.article-preview', { key: slug }, [
        h(Header, { title, slug }),
        h(PublishedDate, { publishedDate }),
        h(Body, { slug, body }),
        h(Link, { href }, 'Read More')
      ]);
    })
  ]);
};
