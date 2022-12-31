const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "https://127.0.0.1:7208/",
      changeOrigin: true,
      secure:false
    })
  );
  app.use(
    '/api2',
    createProxyMiddleware({
      target: "https://127.0.0.1:5000/",
      changeOrigin: true,
      secure:false
    })
  );
};