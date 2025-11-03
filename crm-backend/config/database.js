const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const dialect = process.env.DB_DIALECT || 'sqlite';

const options = {
  dialect,
  logging: false
};

if (dialect === 'sqlite') {
  options.storage = process.env.DB_STORAGE || './crm_db.sqlite';
} else {
  options.host = process.env.DB_HOST || 'localhost';
  options.port = process.env.DB_PORT || undefined;
  options.username = process.env.DB_USER || undefined;
  options.password = process.env.DB_PASS || undefined;
  options.database = process.env.DB_NAME || undefined;
}

const sequelize = new Sequelize(options);

module.exports = sequelize;
