module.exports = {
    devServer: {
        port: 8083,
        proxy: { //配置多个代理
            "/api": {
              target: "http://101.35.157.171:8089/example",
              changeOrigin: true,
              ws: true,//websocket支持
              secure: false,
              pathRewrite: {
                "^/api": "/"
              }
            }
          }
    }
};