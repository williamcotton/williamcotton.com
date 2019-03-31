const articleUrl = slug => `/articles/${slug}`;
const pageUrl = slug => `/${slug}`;

module.exports = {
  articleUrl,
  pageUrl,
  contentTypes: {
    blogPost: articleUrl,
    page: pageUrl
  }
};
