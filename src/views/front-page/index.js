const h = require('react-hyperscript');
const { useContext } = require('react');

const { RequestContext } = require('../../contexts');

const { PublishedDate, Header, Body } = require('../articles/show');

// TODO: average reading speed of an adult (roughly 265 WPM)

module.exports = ({ allArticles }) => {
  const {
    Link,
    p: { articles }
  } = useContext(RequestContext);
  return h('div.front-page', [
    allArticles.map(({ title, body, slug, publishedDate }) => {
      const href = articles.show({ id: slug });
      return h('article.article-preview', { key: slug }, [
        h(Header, { title, slug }),
        h(PublishedDate, { publishedDate }),
        h(Body, { slug, body }),
        h(Link, { href }, 'Read More')
      ]);
    })
  ]);
};
