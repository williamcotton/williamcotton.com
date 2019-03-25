const h = require('react-hyperscript');

const { articleUrl, PublishedDate, Header, Body } = require('./article');

const richTextToPreview = body => {
  const previewBody = Object.assign({}, body);
  previewBody.content = body.content.slice(0, 3);
  return previewBody;
};

// TODO: average reading speed of an adult (roughly 265 WPM)

module.exports = ({ articles, Link }) =>
  h('div.articles', [
    articles.map(({ title, body, slug, publishedDate }) => {
      const href = articleUrl(slug);
      return h('article.article-preview', { key: slug }, [
        h(Header, { title, slug, Link }),
        h(PublishedDate, { publishedDate }),
        h(Body, { slug, body: richTextToPreview(body), Link }),
        h(Link, { href }, 'Read More')
      ]);
    })
  ]);
