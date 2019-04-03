const h = require('react-hyperscript');
const { parse, format } = require('date-fns');

const RichText = require('../vendor/contentful-rich-text');
const renderNode = require('../common/render-node');

const { articleUrl } = require('../common/url');

const PublishedDate = ({ publishedDate }) =>
  h('p.published-date', format(parse(publishedDate), 'MMMM Do, YYYY'));

const Header = ({ title, slug, Link }) =>
  h('h2', { key: slug }, h(Link, { href: articleUrl(slug) }, title));

const Body = ({ slug, body, Link }) =>
  h(RichText, { key: slug, richText: body, options: { renderNode: renderNode({ Link }) } });

const Article = ({ article: { title, body, slug, publishedDate }, Link }) =>
  h('article', { key: slug }, [
    h(Header, { title, slug, Link }),
    h(PublishedDate, { publishedDate }),
    h(Body, { slug, body, Link })
  ]);

Article.renderNode = renderNode;
Article.PublishedDate = PublishedDate;
Article.Header = Header;
Article.Body = Body;

module.exports = Article;
