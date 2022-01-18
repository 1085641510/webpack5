const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: ['@babel/polyfill','./src/index.js']
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: process.env.NODE_ENV === 'production'
      ? './'
      : '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve('src'),
    }
  },
  // assetsDir:'static',
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [

    // new webpack.ProvidePlugin({
    //   join: ['lodash', 'join']
    // }),

  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss|sass)$/i,
        use: [process.env.NODE_ENV !== 'production'
          ? 'style-loader'
          : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                [
                  'postcss-preset-env',
                ],
              ],
            },
          },
        }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: "url-loader",
          options: {
            // limit: 1024,//图片小于这个值则将图片转化为base64码
            outputPath: "static/",
            //name:"[path][name].[ext]",// 不加name则使用hash
            //publicPath:"http://100.114.234.208/"
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /.(woff|woff2|eot|ttf|otf|TTF|svg).*?$/,
        loader: "file-loader"
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
        exclude: /node_modules/
      },
      // {
      //   test: require.resolve('./src/index.js'),
      //   use: 'imports-loader?wrapper=window',
      //   exclude: /node_modules/
      // },
    ],
  },

};
