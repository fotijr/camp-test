var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackOutput = {
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false
};

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/, // include .js files
                enforce: "pre", // preload the jshint loader
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                use: [
                    {
                        loader: "jshint-loader",
                        options: {
                            esversion: 6,
                            camelcase: true,
                            browser: true,
                            undef: true,
                            devel: true,
                            globals: {
                                "describe": true, // prevent jshint warning for jasmine function names
                                "it": true,
                                "expect": true
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/index.html' },
            { from: './src/main.css' },
            { from: './src/api',to: 'api' },
            { from: './src/img', to: 'img' }
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        stats: "errors-only"
        //stats: webpackOutput
    },
    devtool: "cheap-eval-source-map"
};