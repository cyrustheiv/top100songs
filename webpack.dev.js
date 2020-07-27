const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
    
module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            { test: /\.scss$/,
                use: [
                    'vue-style-loader', // Inject styles into the DOM
                    'css-loader', // Turn css into commonjs
                    'sass-loader' // Turn sass into css
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new VueLoaderPlugin(),
    ]
});