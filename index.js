require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

app.listen(PORT, async () => {
  try {
    await db.ensureDatabaseConnection();
    console.log('DB OK ✅');
  } catch (e) {
    console.error('DB NOT OK ❌', e);
  }

  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
