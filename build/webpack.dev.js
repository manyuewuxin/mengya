const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackconfig = require("./webpack.base.js");
//const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); //块图
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin"); 
const config = require("../config");

Object.keys(webpackconfig.entry).forEach(function(name) {
    webpackconfig.entry[name] = [
        "webpack-hot-middleware/client?noInfo=true&reload=true"
    ].concat(webpackconfig.entry[name]);
});

module.exports = merge(webpackconfig, {
    devtool: "cheap-module-source-map",
    mode: "development",
    module: {
        rules: [
            { 
                test: /\.less$/, 
                use: ["style-loader", "css-loader", "less-loader"] 
            },
            {
                test: /\.css$/, 
                use: ["style-loader", "css-loader"] 
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(config.dev.env)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ]
});

//new BundleAnalyzerPlugin() 