const { getPool } = require('./database');

async function listUsers() {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
}

module.exports = { listUsers };
