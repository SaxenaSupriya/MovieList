const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const APP_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve(__dirname, 'dist');

const chunkFilename = `scripts/js/movie-list-vendor.js`;
const bundleFilename = `scripts/js/movie-list-bundle.js`

module.exports = { 
entry: {
    main: `${APP_DIR}/app.js`
},
devtool: 'source-map',
devServer: {
  contentBase: path.join(__dirname, `dist`),
  port: 9000
},
module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          plugins: [],
        }
      },
      {
        test: /\.(css|scss)/,
        use: [
          MiniCssExtractPlugin.loader,
          { 
            loader: 'css-loader', 
            options: { 
              url: false, 
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
      },
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: bundleFilename,
    publicPath: '/dist/',
    chunkFilename: chunkFilename
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: chunkFilename,
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
    template: `${APP_DIR}/index.html`,
    filename: `${BUILD_DIR}/index.html`
  }),
  new MiniCssExtractPlugin({
    filename: "css/styles.css"
  })
]
};