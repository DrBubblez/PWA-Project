// Establishes the webpack configuration for the client side
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => { // this fuction is called by webpack to get the config object
  return {
    mode: 'development', // change to production for production build
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: { // output bundle file
      filename: '[name].bundle.js', 
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [ 
      new HtmlWebpackPlugin({ // plugin to generate html file
        template: './index.html', // template file
        filename: 'index.html', // output file
        chunks: ['main'], // chunk to include
      }),
      new WebpackPwaManifest({ // plugin to generate manifest file
        name: 'JATE Text Editor', // app name
        short_name: 'JATE', // short name
        description: 'A simple text editor', // description
        background_color: '#ffffff', // background color
        crossorigin: 'use-credentials', // serves cross-origin requests with credentials
        icons: [
          { // icons for different sizes
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
      new InjectManifest({ // plugin to generate service worker
        swSrc: './src-sw.js', // service worker file
        swDest: 'sw.js', // output file
      }),
    ],

    module: {
      rules: [
        { // rule to load html files
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        { // rule to load css files
          test: /\.js$/, 
          exclude: /node_modules/, 
          use: { // use babel to transpile js files
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env'] },
          }
        }
      ],
    },
  };
};
