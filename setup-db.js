const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Manually parse .env file if it exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=').trim();
      process.env[key.trim()] = value;
    }
  });
}

async function run() {
  console.log('Initializing database setup...');
  
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const port = parseInt(process.env.DB_PORT || '3306');
  const database = process.env.DB_NAME || 'mortgage_xperts';

  try {
    // 1. Connect without db name to create it if not exists
    const tempConn = await mysql.createConnection({ host, user, password, port });
    console.log(`Connected to MySQL server at ${host}:${port}.`);
    await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    console.log(`Database "${database}" verified/created.`);
    await tempConn.end();

    // 2. Connect with db name to run schema script
    const conn = await mysql.createConnection({ host, user, password, database, port });
    console.log(`Connected to database "${database}".`);

    const schemaPath = path.join(__dirname, 'schema.sql');
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`schema.sql not found at path: ${schemaPath}`);
    }

    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    // Remove SQL comment lines
    const cleanSql = schemaSql.replace(/--.*$/gm, '');
    
    // Split statements by semicolon, ignoring empty lines
    const statements = cleanSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    console.log(`Executing ${statements.length} SQL statements...`);
    for (let statement of statements) {
      // Re-add comment filtering if nested
      if (statement.startsWith('INSERT IGNORE')) {
        // Keep as single statement
      }
      await conn.query(statement);
    }
    
    console.log('Database schema successfully initialized!');
    await conn.end();
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

run();
