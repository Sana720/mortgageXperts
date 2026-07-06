import { initializeTables } from '../lib/db';

async function main() {
  console.log('Starting remote database initialization and seeding...');
  await initializeTables();
  console.log('Database initialization completed successfully.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
