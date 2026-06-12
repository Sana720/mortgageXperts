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
  console.log('Seeding branch page configurations into database...');
  
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const port = parseInt(process.env.DB_PORT || '3306');
  const database = process.env.DB_NAME || 'mortgage_xperts';

  try {
    const conn = await mysql.createConnection({ host, user, password, database, port });
    console.log(`Connected to database "${database}".`);

    const seedQueries = [
      {
        page_path: '/branches/sydney',
        meta_title: 'Mortgage Xperts Sydney | Home Loans in New South Wales',
        meta_description: "Sydney's trusted mortgage brokers. Compare 40+ lenders, access local government grants and secure the best home loan rate in NSW. Free consultation.",
        meta_keywords: 'mortgage broker Sydney, home loans Sydney, NSW mortgage broker, Nepali mortgage broker Sydney, first home buyer Sydney',
        hero_badge: 'Sydney Branch',
        hero_title: 'Home Loans in Sydney',
        hero_subtext: "Sydney's property market is one of the most competitive in the world. Our Sydney-based mortgage brokers have deep knowledge of the local lending landscape — from the inner west to the Northern Beaches — to help you secure the right loan at the best rate.",
        hero_image: '/images/sydney_real.png',
        hero_btn1_text: 'Book Free Consultation',
        hero_btn1_link: '#enquiry',
        hero_btn2_text: 'Check Borrowing Power',
        hero_btn2_link: '/borrowing-power-calculator'
      },
      {
        page_path: '/branches/melbourne',
        meta_title: 'Mortgage Xperts Melbourne | Home Loans in Victoria',
        meta_description: "Melbourne's trusted mortgage brokers. Compare 40+ lenders, access local government grants and secure the best home loan rate in VIC. Free consultation.",
        meta_keywords: 'mortgage broker Melbourne, home loans Melbourne, VIC mortgage broker, Nepali mortgage broker Melbourne, first home buyer Melbourne',
        hero_badge: 'Melbourne Branch',
        hero_title: 'Home Loans in Melbourne',
        hero_subtext: "Melbourne's diverse suburbs and property types require a broker who understands the VIC market. From first-home buyers in the outer east to investors in the inner north, our Melbourne brokers tailor every loan strategy to match your goals.",
        hero_image: '/images/melbourne_real.png',
        hero_btn1_text: 'Book Free Consultation',
        hero_btn1_link: '#enquiry',
        hero_btn2_text: 'Check Borrowing Power',
        hero_btn2_link: '/borrowing-power-calculator'
      },
      {
        page_path: '/branches/brisbane',
        meta_title: 'Mortgage Xperts Brisbane | Home Loans in Queensland',
        meta_description: "Brisbane's trusted mortgage brokers. Compare 40+ lenders, access local government grants and secure the best home loan rate in QLD. Free consultation.",
        meta_keywords: 'mortgage broker Brisbane, home loans Brisbane, QLD mortgage broker, Nepali mortgage broker Brisbane, first home buyer Brisbane',
        hero_badge: 'Brisbane Branch',
        hero_title: 'Home Loans in Brisbane',
        hero_subtext: "Brisbane is booming — fuelled by the 2032 Olympics pipeline and interstate migration. Our Brisbane brokers are embedded in the local market, helping buyers, investors and refinancers capitalise on QLD's incredible growth story.",
        hero_image: '/images/brisbane_real.png',
        hero_btn1_text: 'Book Free Consultation',
        hero_btn1_link: '#enquiry',
        hero_btn2_text: 'Check Borrowing Power',
        hero_btn2_link: '/borrowing-power-calculator'
      },
      {
        page_path: '/branches/perth',
        meta_title: 'Mortgage Xperts Perth | Home Loans in Western Australia',
        meta_description: "Perth's trusted mortgage brokers. Compare 40+ lenders, access local government grants and secure the best home loan rate in WA. Free consultation.",
        meta_keywords: 'mortgage broker Perth, home loans Perth, WA mortgage broker, Nepali mortgage broker Perth, first home buyer Perth',
        hero_badge: 'Perth Branch',
        hero_title: 'Home Loans in Perth',
        hero_subtext: "Perth has recorded some of Australia's strongest property price growth in recent years, driven by mining boom wealth, interstate migration, and limited housing stock. Our Perth brokers understand WA's unique lending landscape and lender appetite.",
        hero_image: '/images/perth_real.png',
        hero_btn1_text: 'Book Free Consultation',
        hero_btn1_link: '#enquiry',
        hero_btn2_text: 'Check Borrowing Power',
        hero_btn2_link: '/borrowing-power-calculator'
      },
      {
        page_path: '/branches/adelaide',
        meta_title: 'Mortgage Xperts Adelaide | Home Loans in South Australia',
        meta_description: "Adelaide's trusted mortgage brokers. Compare 40+ lenders, access local government grants and secure the best home loan rate in SA. Free consultation.",
        meta_keywords: 'mortgage broker Adelaide, home loans Adelaide, SA mortgage broker, Nepali mortgage broker Adelaide, first home buyer Adelaide',
        hero_badge: 'Adelaide Branch',
        hero_title: 'Home Loans in Adelaide',
        hero_subtext: "Adelaide is one of Australia's most affordable capital cities for property — and it's growing fast. Our Adelaide brokers know SA's unique lending environment, government grants, and the suburbs with the strongest growth prospects.",
        hero_image: '/images/adelaide_real.png',
        hero_btn1_text: 'Book Free Consultation',
        hero_btn1_link: '#enquiry',
        hero_btn2_text: 'Check Borrowing Power',
        hero_btn2_link: '/borrowing-power-calculator'
      }
    ];

    console.log('Inserting/updating branch records in page_meta_hero table...');
    for (const data of seedQueries) {
      await conn.query(
        `INSERT INTO page_meta_hero 
          (page_path, meta_title, meta_description, meta_keywords, hero_badge, hero_title, hero_subtext, hero_image, hero_btn1_text, hero_btn1_link, hero_btn2_text, hero_btn2_link, slides) 
         VALUES 
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '[]')
         ON DUPLICATE KEY UPDATE 
          meta_title = VALUES(meta_title),
          meta_description = VALUES(meta_description),
          meta_keywords = VALUES(meta_keywords),
          hero_badge = VALUES(hero_badge),
          hero_title = VALUES(hero_title),
          hero_subtext = VALUES(hero_subtext),
          hero_image = VALUES(hero_image),
          hero_btn1_text = VALUES(hero_btn1_text),
          hero_btn1_link = VALUES(hero_btn1_link),
          hero_btn2_text = VALUES(hero_btn2_text),
          hero_btn2_link = VALUES(hero_btn2_link)`,
        [
          data.page_path,
          data.meta_title,
          data.meta_description,
          data.meta_keywords,
          data.hero_badge,
          data.hero_title,
          data.hero_subtext,
          data.hero_image,
          data.hero_btn1_text,
          data.hero_btn1_link,
          data.hero_btn2_text,
          data.hero_btn2_link
        ]
      );
      console.log(`Configured path: ${data.page_path}`);
    }

    console.log('Seeding branch page configurations completed successfully!');
    await conn.end();
    process.exit(0);
  } catch (error) {
    console.error('Seeding branch configurations failed:', error);
    process.exit(1);
  }
}

run();
