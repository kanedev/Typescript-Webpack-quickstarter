const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin ({filename:'./assets/css/app.css'});


module.exports = {
 mode: 'development',
  context:path.resolve(__dirname,'src'),
  entry: //path.join(__dirname, 'src', 'index'),
  {
    app: './index.ts'
  },
  //watch: true,
  output: {
    path: path.resolve(__dirname,'dist') ,
    filename: "bundle.js",
    pathinfo: false,
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
    rules: [
  //babel-loader    
    //   {
    //   test: /\.js?x$/,
    //   include: [
    //     path.resolve(__dirname, 'src')
    //   ],
    // exclude: [
    //     path.resolve(__dirname, 'node_modules')
    //   ],
    // loader: 'babel-loader',
    // query: {
    //     presets: [
    //       ["@babel/env", {
    //         "targets": {
    //           "browsers": "last 2 chrome versions"
    //         }
    //       }]
    //     ]
    //   }
    // },
  //html-loader
  {
    test:/\.html$/,
    use:['html-loader']
  },
  //Css-loader & Sass-loader
  {
    test: /\.scss$/,
    include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
    use: extractPlugin.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ],
      fallback: 'style-loader'
    })
  }
  ,

  // ts-loader
  {
    test: /\.ts$/,
    include: [
      path.resolve(__dirname, 'src')
    ],
  exclude: [
      path.resolve(__dirname, 'node_modules')
    ],
    use: 'awesome-typescript-loader'
  },
  
  ]
  },

  resolve: {
    extensions: ['.ts','.js']
 },

plugins: [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: 'index.html'
  }),
  extractPlugin
]
,
//  resolve: {
//      extensions: ['.json','.ts', '.tsx', '.js', '.jsx']
//   },







};