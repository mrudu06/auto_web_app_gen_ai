const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  async rewrites() {
    return [
      {
        source: '/generate',
        destination: 'http://localhost:5000/generate',
      },
    ];
  },
};