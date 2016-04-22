var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');
webpackConfig.entry = {};

module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['mocha'],
        reporters: ['progress'],
        files: [
            '../dist/build.js',
            'index.js'
        ],
        preprocessors: {
            'index.js': ['webpack']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        plugins: [
            require("karma-webpack"),
            require("karma-mocha")
        ]
    });
};