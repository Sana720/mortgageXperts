const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const parts = trimmed.split('=');
      const key = parts[0].trim();
      const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = value;
    });
  }
}

async function seed() {
  loadEnv();
  console.log('Connecting to database:', process.env.DB_NAME || 'mortgage_xperts');

  let connection;
  if (process.env.DATABASE_URL) {
    const dbUrl = new URL(process.env.DATABASE_URL);
    connection = await mysql.createConnection({
      host: dbUrl.hostname,
      user: dbUrl.username,
      password: dbUrl.password,
      database: dbUrl.pathname.substring(1),
      port: parseInt(dbUrl.port || '3306'),
      ssl: { rejectUnauthorized: true }
    });
  } else {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'mortgage_xperts',
      port: parseInt(process.env.DB_PORT || '3306'),
    });
  }

  const scanPath = path.join(__dirname, '..', 'paragraphs_scan.json');
  if (!fs.existsSync(scanPath)) {
    console.error('paragraphs_scan.json not found!');
    process.exit(1);
  }

  const scanData = JSON.parse(fs.readFileSync(scanPath, 'utf8'));

  for (const item of scanData) {
    if (item.paragraphs.length === 0) continue;

    // Convert file path to route path
    // e.g. "\cash-rate-change-calculator\ClientPage.tsx" -> "/cash-rate-change-calculator"
    // e.g. "\stamp-duty-calculator\stamp-duty-in-vic\ClientPage.tsx" -> "/stamp-duty-calculator/stamp-duty-in-vic"
    let routePath = item.file.replace(/\\\\/g, '/').replace(/\\/g, '/');
    if (routePath.startsWith('/')) routePath = routePath.substring(1);
    if (routePath.endsWith('ClientPage.tsx')) routePath = routePath.replace('/ClientPage.tsx', '');
    if (routePath.endsWith('page.tsx')) routePath = routePath.replace('/page.tsx', '');
    routePath = '/' + routePath;

    const sectionsArray = item.paragraphs.map(p => p.text);
    const contentStr = JSON.stringify(sectionsArray);

    await connection.execute(
      'INSERT INTO page_content (page_path, content) VALUES (?, ?) ON DUPLICATE KEY UPDATE content = VALUES(content)',
      [routePath, contentStr]
    );
    console.log(`Seeded JSON array of ${sectionsArray.length} sections for: ${routePath}`);
  }

  await connection.end();
  console.log('Seeding completed successfully!');
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
