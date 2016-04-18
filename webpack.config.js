var Path = require('path');
var webpack = require('webpack');
module.exports = {
    cache: true,
    debug: true,
    devtool: 'eval',
    entry: './lib/main.js',
    output: {
        path: Path.join(__dirname, "dist"),
        filename: 'build.js'
    },
    module:{
        loaders:[
            { test: /\.css$/, loader:"style-loader!css-loader"}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json'],
        root: [Path.join(__dirname, "node_modules")],
        modulesDirectories: ['node_modules'],
        alias: {
            "ScrollMagic": Path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js'),
            "animation.velocity": Path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/plugins/animation.velocity.min.js'),
            "velocity": Path.resolve('node_modules', 'velocity-animate/velocity.min.js'),
            "debug.addIndicators" :Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
        }
    }
};