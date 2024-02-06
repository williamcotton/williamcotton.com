/* global window, document */

import qs from "qs";

const { expressLink } = window;

const { defaultTitle } = expressLink;

export default () => (req, res, next) => {
  Object.keys(expressLink).forEach((key) => (req[key] = expressLink[key])); // eslint-disable-line no-return-assign

  req.renderDocument = ({ title }) => {
    document.querySelector("title").innerText = title || defaultTitle; // eslint-disable-line no-param-reassign
    return { appContainer: document.querySelector("#app") };
  };

  res.navigate = (path, query) => {
    const pathname = query ? `${path}?${qs.stringify(query)}` : path;
    res.redirect(pathname);
  };

  res.redirect = res.redirect.bind(res);

  next();
};
