const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/whatstheword',
    createProxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true,
      ws: true,
      secure: false,
    })
  );
};
