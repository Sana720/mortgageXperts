const { executeQuery } = require('./lib/db');

async function migrate() {
  try {
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS team_members (
          id VARCHAR(191) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          role VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          bio TEXT NOT NULL,
          image VARCHAR(255) NOT NULL,
          orderIndex INT DEFAULT 0,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created team_members table');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

migrate();
