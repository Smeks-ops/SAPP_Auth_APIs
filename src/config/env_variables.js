const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SHOW_SQL_LOGS: process.env.SHOW_SQL_LOGS,

  // SECRET USED TO HASH(crypto) PASS TOKENS
  PASS_TOKEN_SECRET: process.env.PASS_TOKEN_SECRET,

  // Email config
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,

  // role names
  USER_ROLE_NAME: 'user',
  ADMIN_ROLE_NAME: 'admin',

  // JWT TOKEN KEY FOR SUPPER ADMIN
  JWT_RESET_PASSWORD_SECRET: process.env.JWT_RESET_PASSWORD_SECRET,
  JWT_USER_SECRET: process.env.JWT_USER_SECRET,
  PRODUCTION_DB_URL: process.env.PRODUCTION_DB_URL,
  debugLog: process.env.DEBUG_LOG,
};
