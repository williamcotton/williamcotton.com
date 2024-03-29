const h = require('react-hyperscript');
const format = require('date-fns/format');
const parse = require('date-fns/parse');
const { useContext } = require('react');
const {
  documentToReactComponents
} = require('@contentful/rich-text-react-renderer');

const { RequestContext } = require('../../contexts');
const renderNode = require('../../common/render-node');

const RichText = ({ richText, options }) =>
  documentToReactComponents(richText, options);

const PublishedDate = ({ publishedDate }) =>
  h('p.published-date', format(parse(publishedDate), 'MMMM Do, YYYY'));

const Header = ({ title, slug }) => {
  const {
    Link,
    p: { articles }
  } = useContext(RequestContext);
  return h(
    'h2',
    { key: slug },
    h(Link, { href: articles.show({ id: slug }) }, title)
  );
};

const Body = ({ slug, body }) => {
  const { Link, p } = useContext(RequestContext);
  return h(RichText, {
    key: slug,
    richText: body,
    options: { renderNode: renderNode({ Link, p }) }
  });
};

const Article = ({ article: { title, body, slug, publishedDate } }) =>
  h('article', { key: slug }, [
    h(Header, { title, slug }),
    h(PublishedDate, { publishedDate }),
    h(Body, { slug, body })
  ]);

Article.renderNode = renderNode;
Article.PublishedDate = PublishedDate;
Article.Header = Header;
Article.Body = Body;

module.exports = Article;
