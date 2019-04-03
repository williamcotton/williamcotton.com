const articleUrl = slug => `/articles/${slug}`;
const pageUrl = slug => `/${slug}`;

// TODO: use something like https://github.com/alubbe/named-routes
// but add support for content-types as well?

module.exports = {
  articleUrl,
  pageUrl,
  contentTypes: {
    blogPost: articleUrl,
    page: pageUrl
  }
};
