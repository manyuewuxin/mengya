const path = require("path");

module.exports = {
    build: {
        env: "production",
        index: path.resolve(__dirname, "../src/dist/index.html"),
        assetsRoot: path.resolve(__dirname, "../dist"),
        assetsPublicPath: "/",
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ["js", "css"]
    },
    dev: {
        env: "development",
        port: 3000,
        assetsPublicPath: "/",
        context: [
            "/user", 
            "/posts", 
            "/file",
            "/editor",
            "/logo",
            "/collect",
            "/avatar"
        ],
        proxypath: "http://localhost:8000"
    }
};
