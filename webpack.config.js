const path = require("path"); // для работы с путями
const {CleanWebpackPlugin} = require("clean-webpack-plugin"); // очищение папки проекта
const HTMLWebpackPlugin = require("html-webpack-plugin"); // плагин для работы с HTML
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // плагин выносит css в отдельный файл



module.exports = {
    mode: "development",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    entry: {
        main: "./src/index.js"
    },
    output: {
        filename: "./js/[name].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/assets/index.pug",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: "pug-loader"
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "/dist/css"
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpeg|jpg)$/,
                loader: "file-loader",
                options:{
                    outputPath: "images",
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: "file-loader",
                options: {
                    outputPath: "fonts",
                    name: "[name].[ext]"
                }
            },
        ]
    }
}