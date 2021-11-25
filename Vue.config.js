module.exports = {
    devServer: {
        port: 8083,
        proxy: { //配置多个代理
            "/api": {
              target: "http://localhost:8081",
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
