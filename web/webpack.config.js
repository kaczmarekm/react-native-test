const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');

const appDirectory = path.resolve(__dirname, '../');

dotenv.config({
  path: path.resolve(appDirectory, '.env'),
  override: true,
});

// This is needed for webpack to compile TypeScript.
const tsLoaderConfiguration = {
  test: /\.(ts|tsx)$/,
  exclude: /node_modules/,
  loader: 'ts-loader',
  options: {
    transpileOnly: true,
  },
};

// This is needed for webpack to compile JavaScript.
const babelLoaderConfiguration = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules\/(?!react-native-reanimated)/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: ['@babel/preset-react'],
      // Re-write paths to import only the modules needed by the app
      plugins: ['babel-plugin-react-native-web'],
    },
  },
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

module.exports = {
  devtool: 'inline-source-map',

  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    'babel-polyfill',
    path.resolve(appDirectory, 'index.js'),
  ],

  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, './web/dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './web/public/index.html',
      filename: './index.html',
      favicon: './web/public/favicon.ico',
    }),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV === 'development',
      'process.env': JSON.stringify(process.env),
    }),
  ],

  module: {
    rules: [
      tsLoaderConfiguration,
      babelLoaderConfiguration,
      imageLoaderConfiguration,
    ],
  },

  devServer: {
    static: {
      directory: path.resolve(appDirectory, './web/public'),
    },
  },

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [
      '.web.js',
      '.js',
      'web.ts',
      '.ts',
      'web.jsx',
      '.jsx',
      'web.tsx',
      '.tsx',
    ],
  },
};
