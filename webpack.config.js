var webpack = require('webpack');
var config = {
    entry:{
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js']
    },
    output:{
        path:__dirname + '/dist',
        filename:'js/[name].js'
    },
    externals:{
        'jquery':'window.jQuery'
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name : 'commons',
            filename : 'js/base.js'
        })
    ]
};

module.exports = config;