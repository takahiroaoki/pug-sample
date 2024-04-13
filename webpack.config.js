const path = require('path')
const PugPlugin = require('pug-plugin')

const baseDir = path.resolve(__dirname, '..')
const srcDir = path.resolve(baseDir, 'src')
const buildDir = path.resolve(baseDir, 'build')

module.exports = {
    entry: {
        'component-catalog/index': './src/pages/component-catalog/index.pug',
    },
    output: {
        publicPath: '/',
    },
    plugins: [
        new PugPlugin({
            pretty: true,
            js: {
                filename: '[name].js',
            },
            css: {
                filename: '[name].css',
            },
        }),
    ],
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
                use: ['sass-loader'],
            },
        ],
    },
    devServer: {
        host: '0.0.0.0',
    }
}