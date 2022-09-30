const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
const ProgressBarPlugin = require('webpackbar');

module.exports = {
  entry: { index: path.resolve(__dirname, '../../src/index.tsx') },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../dist'),
    clean: true,
    publicPath: '/',
  },
  stats: 'errors-warnings',
  resolve: {
    mainFiles: ['index', 'default'],
    alias: {
      '@src': path.join(__dirname, '../../src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      // images
      {
        test: /* 匹配文件 */ /\.jpg|\.png|\.svg/,
        include: [
          path.resolve(__dirname, '../../src'),
          path.resolve(__dirname, '../../public'),
        ],
        use: /* 使用loader */ [
          {
            loader: 'url-loader',
            options: /* 加载器相关的配置项 */ {
              name: 'static/[name].[ext]',
              limit: /* <=limit的图片转换成base64 */ 8196,
              mimetype: 'image/jpg|image/png||image/svg',
              fallback: 'file-loader',
              // publicPath: '../../' //采用根路径
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new CleanTerminalPlugin(),
    new ProgressBarPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
  ],
  optimization: {
    usedExports: false,
  },
};
