const { executeQuery } = require('./lib/db');

async function migrate() {
  try {
    await executeQuery('ALTER TABLE enquiries ADD COLUMN message TEXT');
    console.log('Added message column to enquiries');
  } catch (e) {
    if (e.message.includes('Duplicate column name')) {
      console.log('Column already exists');
    } else {
      console.error(e);
    }
  }
}

migrate();
