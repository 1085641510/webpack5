const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const port = process.env.port || 9000;


module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // host:"",
    port: port,
    open: true,    // open: ['/my-page'],在浏览器中打开指定页面   
    // open: {app: {name: 'google-chrome',},} 打开指定浏览器
    // open: {
    //   target: ['first.html', 'http://localhost:8080/second.html'],
    //   app: {
    //     name: 'google-chrome',
    //     arguments: ['--incognito', '--new-window'],
    //   },
    // }
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      const port = devServer.server.address().port;
      console.log(process.env.NODE_ENV)
      console.log('Listening on port:', port);
    },
    // proxy: {
    //   '/api': {
    //     target: 'https://epidas.westonecloud.com',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '/szxa'
    //     }
    //   }
    // },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true
      //title:'',
      //inject:true,  //true/'head'/'body'/false true或body时js放置在body底部，head则在head元素中
      //favicon:'', // 添加 favicon 图标
      // favicon: './static/imgs/favicon.ico',
      // chunks: ["index"],//对应的节点
      // hash: true, //是否为静态资源生成hash值
      // minify: {
      //   removeComments: true,//删除html中的注释
      //   collapseWhitespace: true//删除html中的换行符和空白值
      // }
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