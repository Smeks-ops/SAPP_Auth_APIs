/* eslint-disable no-console */
const {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_DIALECT,
  PRODUCTION_DB_URL,
  SHOW_SQL_LOGS,
} = require('../config/env_variables');

// sequelize database configuration

module.exports = {
  development: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT,
    idleTimeoutMillis: 30000,
    logging: (str) => (SHOW_SQL_LOGS === 'true' ? console.log(str) : null),
  },

  production: {
    use_env_variable: 'production',
    url: PRODUCTION_DB_URL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: (str) => (SHOW_SQL_LOGS === 'true' ? console.log(str) : null),
  },
};
