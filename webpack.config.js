const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const DashboardPlugin = require("webpack-dashboard/plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin')

const env = process.env.NODE_ENV;

const glob = require('glob')
const PATHS = {
  src: path.join(__dirname, 'src')
}



module.exports = {
 mode: env  || 'development',
  context:path.resolve(__dirname,'src'),
  entry: //path.join(__dirname, 'src', 'index'),
  {
    app: './js/index.ts',
    another: './js/another-module.ts'
  },
  //watch: true,
  output: {
   // publicPath: 'assets/',
    path: path.resolve(__dirname,'dist') ,
    //filename: "./js/[name].[contenthash].js",
    filename: env === 'development' ? './js/[name].[hash].js' : './js/[name].[contenthash].js',
   // pathinfo: false,
  },
     optimization: {
       
 runtimeChunk: 'single',
     splitChunks: {
       cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all'
         }
       }
     },

     minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],


       }
    ,

  devServer: {
    contentBase: path.resolve(__dirname,'src'),
    hot: true,
   // inline: true,
   // host: '0.0.0.0',
    port: 1111,
    //stats: 'errors-only',
    overlay:true,
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
    test: /\.(sa|sc|c)ss$/,
    include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
    exclude: [  path.resolve(__dirname, 'node_modules') ],
		use: [
   //   'css-hot-loader',
      { loader: MiniCssExtractPlugin.loader ,
        options: {
          outputPath: './assets/media/',
          publicPath: '../../',
          // publicPath: '../assets/',
         /// outputPath: './assets/css/',
         // only enable hot in development
         hmr: process.env.NODE_ENV === 'development',
         // if hmr does not work, this is a forceful method.
         reloadAll: true,
        }
      },
      { 
        loader: "css-loader",
        options: {
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
  {
    test: /\.(gif|png|jpe?g|svg)$/i,
    include: [path.resolve(__dirname, 'src', 'assets', 'media')],
    exclude: [  path.resolve(__dirname, 'node_modules') ],
    use: [
   {loader: 'file-loader',
   options : {
   // name: '[name].[ext]',
    name: env === 'development' ? '[name].[contenthash].[ext]' : 'assets/media/[name].[hash].[ext]',

  },
  },
   { loader: 'image-webpack-loader', },

    ],
   },


  // file-loader (for fonts)
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  
    use: [{
      loader: 'file-loader',
      options: {
         name: env === 'development' ? '[name].[hash].[ext]' : 'assets/fonts/[name].[contenthash].[ext]',
      }
  }],
 // exclude: [  path.resolve(__dirname, 'node_modules') ],
  }
 ]
  },



plugins: [
  new PurgecssPlugin({
    paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
  }),
  new DashboardPlugin(),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
   // inject: false,
    //hash: true,
    template: 'index.html',
    filename: 'index.html'
  }),
  new webpack.HashedModuleIdsPlugin(),
  //env === 'development' ? 'new webpack.HotModuleReplacementPlugin(),' : '',
  //new webpack.HotModuleReplacementPlugin(),
  new MiniCssExtractPlugin({
   // filename: "assets/css/[name].[contenthash].css",
    filename: env === 'development' ? '[name].[hash].css' : './assets/css/[name].[contenthash].css',

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