const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const lessToJs = require('less-vars-to-js');
const fs = require('fs');
const common = require('./webpack.common.config');

// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const ReactRefreshTypeScript = require('react-refresh-typescript');

//转换 less 变量,用于主题
const baseLess = lessToJs(
  fs.readFileSync(path.join(__dirname, '../../src/themes/themes.less'), 'utf8')
);
let themers = {};
Object.keys(baseLess).map((k, i) => {
  let key = String(k).replace(/@/g, '');
  themers[key] = String(baseLess[k]);
});
const lessVars = Object.assign(themers, { '@CDN_BASE': '' });
const lessExclude = /(node_modules)|(App)/;

// const tsLoader = common.module.rules.find((r) => r.loader === 'ts-loader');
// if (tsLoader) {
//   tsLoader.options = {
//     ...tsLoader.options, // 可能为 undefined
//     getCustomTransformers: () => ({
//       before: [ReactRefreshTypeScript()],
//     }),
//     transpileOnly: true,
//   };
// }

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: lessExclude,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: lessVars,
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        include: lessExclude,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: lessVars,
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    client: {
      overlay: {
        warnings: false,
      },
    },
    hot: true, // 它是热更新：只更新改变的组件或者模块，不会整体刷新页面
    open: true, // 是否自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 这是本地用node写的一个服务，用webpack-dev-server起的服务默认端口是8080
        changeOrigin: true, // 加了这个属性，那后端收到的请求头中的host是目标地址 target
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new ReactRefreshWebpackPlugin(),
  ],
});
