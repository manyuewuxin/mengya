const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //独立css
//const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin"); //禁多个css引用
const CompressionWebpackPlugin = require("compression-webpack-plugin"); //压缩
const config = require("../config");
const webpackconfig = require("./webpack.base.js");
 
module.exports = merge(webpackconfig, {
    output: {
        path: config.build.assetsRoot, 
        filename: "static/js/[name].[chunkhash:8].js",
        chunkFilename: "static/js/[name].[chunkhash:8].js"
    },
    mode: "production",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [MiniCssExtractPlugin.loader , "css-loader"] 
            }
        ]
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: (module) => /node_modules/.test(module.context),
                    name: "vendors",
                    enforce: true,
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(config.build.env)
        }),
        new MiniCssExtractPlugin({ filename: "static/css/[name].[hash:8].css" }),
        new CompressionWebpackPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html|css)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
});
