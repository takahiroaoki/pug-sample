const path = require('path')
const PugPlugin = require('pug-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const baseDir = __dirname
const srcDir = path.resolve(baseDir, 'src')
const buildDir = path.resolve(baseDir, 'build')

module.exports = {
    context: srcDir,
    entry: {
        'templates/demo/index': './pages/demo/index.pug',
    },
    output: {
        publicPath: '/pug-sample',
        path: buildDir,
        filename: 'pages/[name].html',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new PugPlugin({
            pretty: true,
            js: {
                filename: 'static/js/[name].js',
            },
            css: {
                filename: 'static/css/[name].css',
            },
        }),
    ],/*
    resolve: {
        extensions: ['.ts', '.pug', '.scss'],
        alias: {
            '@src': srcDir,
        }
    },*/
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader,
                options: {
                    pretty: true,
                    method: 'compile'
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.scss$/,
                use: ['css-loader', 'sass-loader'],
            },
        ],
    },
    devServer: {
        host: '0.0.0.0',
    },
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
    },
}