const { createProxyMiddleware } = require('http-proxy-middleware');
//proxy 설정 
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};