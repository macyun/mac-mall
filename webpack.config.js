var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//单独打包css插件
var HtmlWebpackPlugin = require('html-webpack-plugin');//打包html插件

//环境变量配置，dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name) {
    return {
        template:'./src/view/'+ name +'.html',
        filename:'view/'+ name +'.html',
        inject:true,
        hash:true,
        chunks:['common',name]//entry里的common和
    }
};
var config = {
    entry:{
        'common':['./src/page/common/index.js'],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js']
    },//来源
    output:{
        path:__dirname + '/dist',
        publicPath:'/dist',
        filename:'js/[name].js'
    },//输出的文件名和存放路径
    externals:{
        'jquery':'window.jQuery'
    },//这样可以用require引用jquery
    module:{
        loaders:[
            {test:/\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")},
            {test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'}
        ]
    },
    plugins:[
        //独立通用模块到js/base.js 这里使用到webpack 头部需要引用webpack require('webpack')
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',//entry里的common
            filename : 'js/base.js'
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //HTML模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
};

//如果在本地环境开发
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;