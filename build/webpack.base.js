const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("../config");

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    entry: {
        app: path.resolve(__dirname, "../src/index.js")
    },
    output: {
        path: config.build.assetsRoot,
        filename: "[name].js",
        publicPath:"/"
    },
    resolve: {
        modules: [path.resolve(__dirname, "../node_modules")],
        extensions: [".js", ".json", ".ts", ".tsx"],
        alias: {
            "@components": path.resolve(__dirname, "../src/components/"),
            "@assets": path.resolve(__dirname, "../src/assets/"),
            "@store": path.resolve(__dirname, "../src/store/"),
            "@utils": path.resolve(__dirname, "../src/utils/"),
            "@request": path.resolve(__dirname, "../src/request/")
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(svg|eot|ttf|woff)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[hash].[ext]",
                            outputPath: "static/font/"
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[hash].[ext]",
                            outputPath: "static/img/"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            inject: true,
            env: NODE_ENV,
            template: path.resolve(__dirname, "../src/template/index.html")
        })
    ],
    performance: {
        hints: false
    }
};
