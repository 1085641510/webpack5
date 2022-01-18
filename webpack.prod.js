const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,  //true/'head'/'body'/false true或body时js放置在body底部，head则在head元素中
      //title:'',
      //favicon:'', // 添加 favicon 图标
      // favicon: './static/imgs/favicon.ico',
      // chunks: ["index"],//对应的节点
      hash: true, //是否为静态资源生成hash值
      minify: {
        removeComments: true,//删除html中的注释
        collapseWhitespace: true//删除html中的换行符和空白值
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './static'),
          to: 'static',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['.*']
          }
        }
      ]
    })
  ],
  module: {
  }
});