const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            { test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract css into files
                    'css-loader', // Turn css into commonjs
                    'sass-loader' // Turn sass into css
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "main.css" }),
        new VueLoaderPlugin(),
    ],
});
