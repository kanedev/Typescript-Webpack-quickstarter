const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  context:path.resolve(__dirname,'src'),
  entry: path.join(__dirname, 'src', 'index'),
  //watch: true,
  output: {
    path: path.resolve(__dirname,'dist') ,
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname,'./dist'),
   // inline: true,
   // host: '0.0.0.0',
    port: 1111,
    stats: 'errors-only',
    open: true,
    compress: true
  },
  devtool: 'inline-source-map',

  module: {
    noParse: /jquery|lodash/,
    rules: [{
      test: /\.js?x$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
    exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
    loader: 'babel-loader',
    query: {
        presets: [
          ["@babel/env", {
            "targets": {
              "browsers": "last 2 chrome versions"
            }
          }]
        ]
      }
    }]
  },
plugins: [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: 'index.html'
  })
]

  // resolve: {
  //   extensions: ['.json', '.js', '.jsx']
  // },







};