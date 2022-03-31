module.exports = {
    devServer: {
        port: 8083,
        proxy: { //配置多个代理
            "/api": {
              target: "http://localhost:8081",
              change: true,
              ws: true,//websocket支持
              secure: false,
              pathRewrite: {
                "^/api": "/"
              }
            },
            "/pyapi": {
                target: "http://backend-server:5000",
                change: true,
                ws: true,//websocket支持
                secure: false,
                pathRewrite: {
                    "^/pyapi": "/"
                }
            }
          }
    }
};
