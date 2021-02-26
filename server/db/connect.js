const { Pool } = require('pg');

const pool = new Pool({
  user: 'jiaweiho',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'lifestyle_store'
});

module.exports = { pool };