# Front end frame

webpack5 + ES6 + react17 + react-router-dom5 + antd + redux

## Usage

    Installation module: yarn install
    Development mode: yarn start
    Packaging command: yarn build  (production environment)

## Project construction structure

1 package.json 项目配置文件
2 scripts/webpack/webpack.common.config.js     build basic configuration file
3 scripts/webpack/webpack.dev.config.js    development mode project configuration file
4 scripts/webpack/webpack-prod-config.js   production mode project configuration file
<!-- 5 webpack.dll.conf.js     third-party libraries separately  -->

## Code file

config      project configuration folder
public      project large picture and entry index folder
src/asset   project static folder
src/components      project components folder
src/pages           project development business code folder
src/router          project routing configuration
src/store           project Redux store
src/themes          project theme folder
src/utils           project tool class folder
src/index.ts        project entry file

## Page structure

A page consists of three file structures:
style.module.less       style file
api.js                  interface file
index.tsx               page file

## Menu routing configuration

src\router\router.js    configure menu routing

## Git branch

