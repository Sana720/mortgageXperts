import { Pool } from "mysql2/promise";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

// Extract cityDataMap from app/branches/[city]/page.tsx
const pageFile = fs.readFileSync(path.join(__dirname, "../app/branches/[city]/page.tsx"), "utf8");
const match = pageFile.match(/const cityDataMap: Record<string, CityData> = (\{[\s\S]*?\});\n\n\/\/ ── Metadata/);
if (!match) {
  console.error("Could not extract cityDataMap");
  process.exit(1);
}

// Evaluate it safely
const cityDataMap = eval("(" + match[1] + ")");

async function main() {
  let dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error("DATABASE_URL missing");
  
  if (dbUrl.includes("gateway01")) {
     // Needs ssl
     const connection = await mysql.createConnection({
       uri: dbUrl,
       ssl: { rejectUnauthorized: true }
     });
     await runQueries(connection);
  } else {
     const connection = await mysql.createConnection(dbUrl);
     await runQueries(connection);
  }
}

async function runQueries(connection: any) {
  for (const [cityKey, cityData] of Object.entries(cityDataMap)) {
    const pagePath = `/branches/${cityKey}`;
    
    // Save to page_content
    const query = `
      INSERT INTO page_content (page_path, content) 
      VALUES (?, ?) 
      ON DUPLICATE KEY UPDATE content = ?
    `;
    
    await connection.execute(query, [pagePath, JSON.stringify(cityData), JSON.stringify(cityData)]);
    console.log(`Saved content for ${pagePath}`);
  }

  await connection.end();
}

main().catch(console.error);
