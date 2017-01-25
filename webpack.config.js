'use strict';
let path = require('path'),
    webpack = require('webpack'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(process.cwd(), 'src'),
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: ['awesome-typescript-loader', 'angular2-template-loader']
        }, {
            test: /\.html$/,
            use: 'raw-loader'
        }]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.join(process.cwd(), 'src')
        ),
        new CopyWebpackPlugin([
            {from: 'index.html'},
            {from: 'favicon.ico'}
        ]),
        new ExtractTextPlugin('style.bundle.css')
    ],
    resolve: {
        modules: [
            'node_modules',
            path.resolve(process.cwd(), 'src')
        ],
        extensions: ['.ts', '.js']
    },
    stats: 'errors-only',
    devtool: 'source-map'
};
