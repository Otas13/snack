const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CSS_CLASS_NAME = '[local]';

const extractSASS = new ExtractTextPlugin({
    filename: "styles.css",
    disable: false,
    allChunks: true
});

module.exports =
    {
        entry: './src/app.js',
        output: { path: __dirname + '/dist/', filename: 'snack.js' },
        resolve: {
            extensions: [
                ".js",
                ".scss",
                ".jsx",
            ],
            modules: ["node_modules"],
        },
        plugins: [ extractSASS ],
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: [path.resolve(__dirname, "node_modules")],
                    use:[{
                        loader: 'babel-loader', options: {
                            "plugins": [
                                ["babel-plugin-react-css-modules",
                                    {
                                        "filetypes": {
                                            ".scss": "postcss-scss"
                                        },
                                        "webpackHotModuleReloading": true,
                                        "generateScopedName": CSS_CLASS_NAME
                                    }]
                            ],
                            "presets": ["es2015", "react"]
                        }
                    }
                    ]
                },
                {
                    test: /\.scss$/,
                    loader: extractSASS.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader', options: {
                                modules: true,
                                localIdentName: CSS_CLASS_NAME,
                                camelCase: 'dashes'
                            }
                        }, {
                            loader: "sass-loader", options: {
                                sourceMap: true
                            }
                        }]
                    })
                }
            ]
        }
    };