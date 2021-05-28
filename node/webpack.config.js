const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  resolve : {
    fallback: {
      util: require.resolve("util/")
    }
  },
  entry: {
      db: "./src/db.js",
      store: "./src/store.js"
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../public/js'),
  },
  mode: "development"/*,
  watch: true*/,
  plugins: [
    new NodePolyfillPlugin()
]
};