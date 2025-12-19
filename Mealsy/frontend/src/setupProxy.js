const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/mealsy',
    createProxyMiddleware({
      target: 'http://localhost:7001',
      changeOrigin: true,
      secure: false,
    })
  );
};
