const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

//const extractPlugin = new ExtractTextPlugin ({filename:'./assets/css/app.css'});
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const env = process.env.NODE_ENV;

module.exports = {
 mode: env  || 'development',
  context:path.resolve(__dirname,'src'),
  entry: //path.join(__dirname, 'src', 'index'),
  {
    app: './js/index.ts'
  },
  //watch: true,
  output: {
    path: path.resolve(__dirname,'dist') ,
    filename: "./js/bundle.js",
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
    use:['html-loader'],
    exclude: [  path.resolve(__dirname, 'node_modules') ],
  },
  //Css-loader & Sass-loader
  {
    test: /\.sc|ass$/,
    include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
    exclude: [  path.resolve(__dirname, 'node_modules') ],
		use: [
      { loader: MiniCssExtractPlugin.loader },
      { 
        loader: "css-loader",
        options: {
      //    minimize: true,
          sourceMap: true,
          importLoaders: 1
        }
      },          
      {
        loader: 'postcss-loader',
        options: {
        sourceMap: true,
        config: {
          ctx: {
          cssnano: {},
          autoprefixer: {}
          }
        }
        }
      },
      {
        loader: 'resolve-url-loader' // améliore la résolution des chemins relatifs 
        // (utile par exemple quand une librairie tierce fait référence à des images ou des fonts situés dans son propre dossier)
      },
      { 
        loader: "sass-loader",
        options: {
          sourceMap: true // il est indispensable d'activer les sourcemaps pour que postcss fonctionne correctement
        }
      }
      ]
  }
  ,

  // ts-loader
  {
    test: /\.ts$/,
    include: [   path.resolve(__dirname, 'src','js')],
    exclude: [  path.resolve(__dirname, 'node_modules') ],
    use: 'awesome-typescript-loader' 
  
  },


  // file-loader for images
  // {
  //   test: /\.(jpg|png|gif|svg)$/,
  //   exclude: [  path.resolve(__dirname, 'node_modules') ],
  //   use: [
  //     {
  //       loader: 'file-loader',
  //       options: {
  //         name: '[name].[ext]',
  //         outputPath: './assets/media/',
  //         publicPath: './assets/media/'
  //       }
  //     }
  //   ]
  // },

  // file-loader for images
  {
    test: /\.(gif|png|jpe?g|svg)$/i,
    use: [
   {loader: 'file-loader',
   options : {
    name: '[name].[ext]',
    outputPath: './assets/media/',
    publicPath: './assets/media/'
  },
  },
   { loader: 'image-webpack-loader', },

    ],
   },




  // file-loader (for fonts)
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [{
      loader: 'file-loader',
      options: {
         name: 'fonts/[name].[hash].[ext]',
          outputPath: '/assets/',
          publicPath: '../',
      }
  }],
  exclude: [  path.resolve(__dirname, 'node_modules') ],
  }
 ]
  },



plugins: [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
   // inject: false,
    //hash: true,
    template: 'index.html',
    filename: 'index.html'
  }),
  new MiniCssExtractPlugin({
	  filename: "assets/css/[name].css",
  //  filename: "main.[contenthash].css",
    chunkFilename: "[id].css"
	}),
]
,

resolve: {
  extensions: ['.ts','.js']
},
//  resolve: {
//      extensions: ['.json','.ts', '.tsx', '.js', '.jsx']
//   },







};