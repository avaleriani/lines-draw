var Path = require('path');
var webpack = require('webpack');
var debug = process.env.NODE_ENV !== 'prod';

module.exports = {
    devtool: debug ? 'source-map' : null,
    entry: './src/main.js',
    output: {
        path: Path.join(__dirname, "dist"),
        filename: 'build.js',
        libraryTarget: "umd",
        library: "linesDraw            "
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style-loader!css-loader"}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json'],
        root: [Path.join(__dirname, "node_modules")],
        modulesDirectories: ['node_modules'],
        alias: {
            //   "ScrollMagic": Path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js'),
            "ScrollMagic": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
            "animation.velocity": Path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/plugins/animation.velocity.min.js'),
            "debug": Path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'),
            "velocity": Path.resolve('node_modules', 'velocity-animate/velocity.min.js')
        }
    },
    plugins: debug ? [
        //
    ] : [
        new webpack.optimize.DedupePlugin(),

        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
    ]
};