const path = require("path"); // для работы с путями
const fs = require("fs"); // для работы с файловой системой
const {CleanWebpackPlugin} = require("clean-webpack-plugin"); // очищение папки проекта
const HtmlWebpackPlugin = require("html-webpack-plugin"); // плагин для работы с HTML
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // плагин выносит css в отдельный файл

const PAGES_DIR = `${path.resolve(__dirname, "src")}/assets/pages`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(filename => filename.endsWith(".pug"));



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
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/, ".html")}`
        })),
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
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: "resolve-url-loader",
                        options: {
                            sourceMap: true,
                            debug: true,
                            // root: path.join(__dirname, 'src')
                            attempts: 1,
                        }
                    },
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
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                loader: "file-loader",
                options: {
                    outputPath: "fonts",
                    name: "[name].[ext]"
                }
            },
        ]
    },
    devServer: {
        overlay: true,
        open: true
    }
}