const path = require('path');

module.exports = {
  entry: {
      db: "./src/db.js",
      store: "./src/store.js"
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../public/js'),
  },
  mode: "development"/*,
  watch: true*/
};