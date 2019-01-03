const nodeEnv = process.env.NODE_ENV;
const defaultTitle = process.env.DEFAULT_TITLE;
const port = process.env.PORT || 5000;

const universalServerApp = require('./app')({ defaultTitle });

universalServerApp.listen(port, () => {
  console.log('universalServerApp is running in %s mode on port %s', nodeEnv, port)
});
