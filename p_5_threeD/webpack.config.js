const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './lab.js',
    output: {
        filename: 'lab.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, 
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), 
        },
        open: true, 
        port: 8080,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './lab.html', 
        }),
    ],
    mode: 'development',
};

