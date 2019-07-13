const crypto = require('crypto');
const request = require('request-promise-native');

module.exports = ({ githubClientId, githubSecret, app }) => (
  _req,
  _res,
  next
) => {
  const callbackURI = '/auth/github/callback';
  const redirectURI = `http://localhost:5000${callbackURI}`;
  const githubAuthUrl = 'https://github.com/login/oauth/authorize';
  const githubTokenUrl = 'https://github.com/login/oauth/access_token';
  const githubApiUrl = 'https://api.github.com';
  const state = crypto.randomBytes(8).toString('hex');
  app.get('/auth/github/login', (req, res) => {
    const url = `${githubAuthUrl}?client_id=${githubClientId}&redirect_uri=${redirectURI}&state=${state}&scope=user`;
    res.statusCode = 302;
    res.setHeader('location', url);
    res.end();
  });
  app.get(callbackURI, async (req, res) => {
    const { code } = req.query;
    const { access_token: githubToken } = await request.get({
      url: `${githubTokenUrl}?client_id=${githubClientId}&client_secret=${githubSecret}&code=${code}&state=${state}`,
      json: true
    });
    req.session.githubToken = githubToken;
    const { login: username, name, email, id } = await request.get({
      url: `${githubApiUrl}/user`,
      json: true,
      headers: {
        Authorization: `token ${githubToken}`,
        'user-agent': 'node.js'
      }
    });
    req.session.user = { username, name, email, id, type: 'github' };
    res.redirect('/');
  });
  if (_req.session.user) {
    _req.user = _req.session.user; // eslint-disable-line no-param-reassign
    _res.clientRequest.user = _req.user; // eslint-disable-line no-param-reassign
  }
  next();
};
