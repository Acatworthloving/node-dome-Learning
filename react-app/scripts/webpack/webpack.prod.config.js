const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require("path");
const lessToJs = require('less-vars-to-js');
const fs = require('fs');
const common = require('./webpack.common.config');

//转换 less 变量,用于主题
const baseLess = lessToJs(fs.readFileSync(path.join(__dirname, '../../src/themes/themes.less'), 'utf8'));
let themers = {};
Object.keys(baseLess).map((k, i) => {
    let key = String(k).replace(/@/g, "");
    themers[key] = String(baseLess[k]);
});
const lessVars = Object.assign(themers, { "@CDN_BASE": "" });
const lessExclude = /(node_modules)|(App)/;

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [{
            test: /\.less$/,
            exclude: lessExclude,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        importLoaders: 1,
                        modules: {
                            localIdentName: "[local]___[hash:base64:5]"
                        }
                    },
                },
                {
                    loader: "less-loader",
                    options: {
                        modifyVars: lessVars,
                        javascriptEnabled: true
                    }
                }
            ],
        },
        {
            test: /\.less$/,
            include: lessExclude,
            use: [
                "style-loader", "css-loader",
                {
                    loader: "less-loader",
                    options: {
                        modifyVars: lessVars,
                        javascriptEnabled: true
                    }
                }
            ],
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
            ],
        },
    ],
},
});