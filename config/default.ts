require('dotenv').config();
const PORT = process.env.PORT || 3000;
module.exports = {
  app: {
    appName: process.env.APP_NAME || 'Comtravo flight',
    environment: process.env.NODE_ENV || 'dev',
    baseUrl: `http://localhost:${PORT}`,
    port: PORT,
    app_api_token: process.env.APP_API_TOKEN,
    domain: process.env.APP_DOMAIN || 'app.com',
  },
  api: {
    url: process.env.SERVICE_URL || 'http://127.0.0.1:3000/api/v1',
    lang: 'en',
    prefix: '^/api/v[1-9]',
    resource: '^/resources/[a-zA-Z-]+',
    versions: [1],
    patch_version: '1.0.0',
    pagination: {
      itemsPerPage: 10,
    },
    email_encryption: false,
    expiresIn: 3600 * 124 * 100,
  },
  databases: {
    mongodb: {
      url: process.env.DB_URL,
      test: process.env.DB_TEST_URL,
    },
  },
};
