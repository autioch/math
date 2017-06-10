/*
npm i -S webpack@1 html-webpack-plugin clean-webpack-plugin extract-text-webpack-plugin@1 webpack-livereload-plugin
npm i -S css-loader file-loader postcss-loader@1 style-loader sass-loader node-sass autoprefixer
npm i -S babel-core babel-loader babel-preset-es2015
npm i -S template-minify-loader

npm i -S eslint qslint-config-qb
*/

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const autoprefixer = require('autoprefixer');

/* Setup */
const isProduction = process.argv.indexOf('-p') > -1;
const nameSuffix = new Date().getTime() + (isProduction ? '.min' : '');

/* Paths */
const projectPath = path.join(__dirname, '..');
const sourcePath = path.join(projectPath, 'src');
const distPath = path.join(projectPath, 'dist');
const assetsPath = 'assets';
const dataPath = 'data';

const config = {
  entry: path.join(sourcePath, 'index'),
  output: {
    path: distPath,
    filename: path.join(assetsPath, `[name]${nameSuffix}.js`)
  },
  resolve: {
    root: [path.join(sourcePath)],
    extensions: ['', '.js', '.json', '.css', '.scss', '.json']
  },
  module: {
    loaders: [{
      test: /\.s?css$/,
      loader: ExtractTextPlugin.extract('style', ['css-loader', 'postcss-loader', 'sass-loader'])
    }, {
      test: /\.ico$/i,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /\.json$/i,
      loader: `file?name=${path.join(dataPath,'[name].[ext]')}`
    }, {
      test: /\.woff$/i,
      loader: `file?name=${path.join(assetsPath,'[name].[ext]')}`
    }, {
      test: /\.(html|svg|htm|tpl)$/i,
      loader: 'template-minify-loader'
    }, {
      test: /\.js$/,
      include: [sourcePath],
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        presets: [ ['es2015', {
          loose: true
        }] ]
      }
    }]
  },
  plugins: [
    new ExtractTextPlugin(path.join(assetsPath, `[name]${nameSuffix}.css`), {}),
    new HtmlWebpackPlugin({
      template: path.join(sourcePath, 'index.html'),
      filename: 'index.html',
      allChunks: true
    }),
    new CleanWebpackPlugin([distPath], {
      root: projectPath,
      verbose: false,
      dry: false,
      exclude: ['data']
    })
  ],
  stats: {
    children: false,
    hash: false,
    version: false,
    colors: true
  },
  postcss: () => [autoprefixer],
  sassLoader: {
    includePaths: [sourcePath]
  }
};

if (process.argv.indexOf('--watch') > -1) {
  config.plugins.push(new LiveReloadPlugin({
    appendScriptTag: true,
    ignore: /.(js|json|ico|woff)$/
  }));
}

if (isProduction) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
} else {
  config.devtool = '#eval';
}

module.exports = config;
