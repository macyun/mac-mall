var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//单独打包css插件
var config = {
    entry:{
        'common':['./src/page/common/index.js'],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js']
    },//来源
    output:{
        path:__dirname + '/dist',
        filename:'js/[name].js'
    },//输出的文件名和存放路径
    externals:{
        'jquery':'window.jQuery'
    },//这样可以用require引用jquery
    module:{
        loaders:[
            /*{test:/\.css$/, loader: "style-loader!css-loader"}*/
            {test:/\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")}
        ]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',//entry里的common
            filename : 'js/base.js'
        }),//提供全局模块 这里使用到webpack 头部需要引用webpack require('webpack')
        new ExtractTextPlugin("css/[name].css")
    ]
};

module.exports = config;