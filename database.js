'use strict';

const mysql = require('mysql2/promise');

let pool;

function getPool() {
  if (pool) return pool;

  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'database',

    waitForConnections: true,
    connectionLimit: Number(process.env.DB_POOL_LIMIT || 10),
    queueLimit: 0,

    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  return pool;
}

async function ensureDatabaseConnection() {
  const p = getPool();
  await p.ping();
  return true;
}

async function closePool() {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}

module.exports = { getPool, ensureDatabaseConnection, closePool };
