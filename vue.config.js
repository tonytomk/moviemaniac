const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    outputDir : process.env.NODE_ENV === 'production' ? './webapps/app/moviemaniac' : 'moviemaniac',
    publicPath: '',
    filenameHashing: true,
    productionSourceMap: false,    
    devServer: {
    },
    configureWebpack: {
        module: {
            rules: [
                // any other rules
                {
                  
                }
            ]
        },
        plugins: [
        ]
    }
}