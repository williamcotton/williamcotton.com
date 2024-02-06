import path from 'path';
import webpack from 'webpack';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "development",
  entry: "./src/browser/Browser.fs.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
