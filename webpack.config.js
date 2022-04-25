const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production'
}

module.exports = {
    mode: mode,
    entry: './src/app.js',
    output: {
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/[hash][ext][query]',
      clean: true
    },
    target: 'web',
    devtool: 'source-map',
    devServer:{
      static: './dist',
      hot: false, // optional, but you must not set both hot and liveReload to true
      liveReload: true
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                          postcssOptions: {
                            plugins: [
                              [
                                "postcss-preset-env",
                                {
                                  // Options
                                },
                              ],
                            ],
                          },
                        },
                    },
                    "sass-loader"],
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: 'asset/resource'
            },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: 'asset/resource',
            },
            {
              test: /\.html$/i,
              loader: "html-loader",
            },
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    ['@babel/preset-env', { targets: "defaults" }]
                  ]
                }
              }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css'
        }),
    ],
}
