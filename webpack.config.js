var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

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
            { from: './src/main.css', to: 'main.css' },
            { from: './src/img', to: 'img' }
        ]),
        new HtmlWebpackPlugin({
            title: 'Camp Test',
            files: {
                css: ["main.css"],
                chunks: {
                    "head": {
                        "css": ["main.css"]
                    }
                }
            }
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['main.css'],
            append: true
        })
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