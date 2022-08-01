const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://169.54.48.230:2000/',
      changeOrigin: true
    })
  );
};
