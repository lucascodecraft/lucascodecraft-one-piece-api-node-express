require('dotenv').config();

const config = {
  dbConnectionString: process.env.DB_CONNECTION_STRING,
};

module.exports = config;