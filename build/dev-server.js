const path = require("path");
const express = require("express");
const webpack = require("webpack");
const config = require("../config");
const proxyMiddleware = require("http-proxy-middleware");
const webpackConfig = require("./webpack.dev.js");
const app = express();

var compiler = webpack(webpackConfig);

app.use(
    require("webpack-dev-middleware")(compiler, {
        publicPath: "/",
        LOGLEVEL: "error",
        quiet: true
    })
);

app.use(require("webpack-hot-middleware")(compiler));

app.use(
    require("connect-history-api-fallback")({
        index: "/index.html"
    })
);

app.use(
    proxyMiddleware(config.dev.context, {
        target: config.dev.proxypath,
        changeOrigin: true
    })
);

app.use(express.static(path.resolve(__dirname, "../dist")));

app.listen(config.dev.port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("已连接服务器");
});
