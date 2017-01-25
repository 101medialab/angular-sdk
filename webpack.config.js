'use strict';
let path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: {
        'main': './reusable/CommonModule.ts'
    },
    context: path.join(process.cwd(), '.'),
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
            path.join(process.cwd(), '.')
        )
    ],
    resolve: {
        modules: [
            'node_modules',
            path.resolve(process.cwd(), '.')
        ],
        extensions: ['.ts', '.js']
    },
    stats: 'errors-only',
    devtool: 'source-map'
};
