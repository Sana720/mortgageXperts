-- Global site configurations (logo, contact, address, header phone)
CREATE TABLE IF NOT EXISTS global_settings (
    `key` VARCHAR(191) PRIMARY KEY,
    `value` TEXT NOT NULL
);

-- Dynamic blog posts / articles
CREATE TABLE IF NOT EXISTS blogs (
    id VARCHAR(191) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    coverImage VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    published TINYINT(1) DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Client testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id VARCHAR(191) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    rating INT DEFAULT 5,
    content TEXT NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Form submissions (calculator leads and strategy callbacks)
CREATE TABLE IF NOT EXISTS enquiries (
    id VARCHAR(191) PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    savings VARCHAR(100),
    income VARCHAR(100),
    state VARCHAR(50),
    status VARCHAR(50) DEFAULT 'new',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT IGNORE INTO global_settings (`key`, `value`) VALUES 
('header_phone', '0450 240 757'),
('support_email', 'mortgage@mortgagexperts.com.au'),
('footer_address', 'Sydney, Australia'),
('facebook_url', 'https://facebook.com'),
('instagram_url', 'https://instagram.com'),
('linkedin_url', 'https://linkedin.com'),
('tiktok_url', 'https://tiktok.com'),
('hero_headline', 'Your Gateway to Home Ownership in Australia'),
('hero_subheadline', 'Guiding you through home loans, low-deposit schemes, and first-home buyer grants with professional expertise.'),
('logo_url', '/images/logo.png'),
('site_icon_url', '/favicon.ico'),
('interest_rate', '6.19'),
('meta_title', 'Mortgage Xperts - Australia | Leading Nepali Mortgage Brokerage'),
('meta_description', 'Expert mortgage guidance for home loans, low-deposit schemes, and first-home buyer grants in Australia.'),
('meta_keywords', 'mortgage broker, home loans, first home buyer, Australia home loan, Nepali broker'),
('smtp_host', 'smtp.mailtrap.io'),
('smtp_port', '2525'),
('smtp_user', ''),
('smtp_pass', ''),
('smtp_from', 'noreply@mortgagexperts.com.au'),
('google_maps_embed', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.8987677464875!2d151.20689!3d-33.8688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae40!2sSydney%20NSW!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau');

-- Hero sections and SEO configuration for subpages
CREATE TABLE IF NOT EXISTS page_meta_hero (
    page_path VARCHAR(191) PRIMARY KEY,
    meta_title VARCHAR(255) NOT NULL,
    meta_description TEXT NOT NULL,
    meta_keywords TEXT NOT NULL,
    hero_badge VARCHAR(255) DEFAULT '',
    hero_title VARCHAR(255) DEFAULT '',
    hero_subtext TEXT,
    hero_image VARCHAR(255) DEFAULT '',
    hero_btn1_text VARCHAR(100) DEFAULT '',
    hero_btn1_link VARCHAR(255) DEFAULT '',
    hero_btn2_text VARCHAR(100) DEFAULT '',
    hero_btn2_link VARCHAR(255) DEFAULT '',
    slides TEXT
);

-- Seeding default hero page details
INSERT IGNORE INTO page_meta_hero (page_path, meta_title, meta_description, meta_keywords, hero_badge, hero_title, hero_subtext, hero_image, hero_btn1_text, hero_btn1_link, hero_btn2_text, hero_btn2_link, slides) VALUES 
('/branches/sydney', 'Mortgage Xperts Sydney | Home Loans in New South Wales', 'Sydney\'s trusted mortgage brokers. Compare 40+ lenders, access local government grants and secure the best home loan rate in NSW. Free consultation.', 'mortgage broker Sydney, home loans Sydney, NSW mortgage broker, Nepali mortgage broker Sydney, first home buyer Sydney', 'Sydney Branch', 'Home Loans in Sydney', 'Sydney\'s property market is one of the most competitive in the world. Our Sydney-based mortgage brokers have deep knowledge of the local lending landscape — from the inner west to the Northern Beaches — to help you secure the right loan at the best rate.', '/images/sydney_real.png', 'Book Free Consultation', '#enquiry', 'Check Borrowing Power', '/borrowing-power-calculator', '[]'),
('/branches/melbourne', 'Mortgage Xperts Melbourne | Home Loans in Victoria', 'Melbourne\'s trusted mortgage brokers. Compare 40+ lenders, access local government grants and secure the best home loan rate in VIC. Free consultation.', 'mortgage broker Melbourne, home loans Melbourne, VIC mortgage broker, Nepali mortgage broker Melbourne, first home buyer Melbourne', 'Melbourne Branch', 'Home Loans in Melbourne', 'Melbourne\'s diverse suburbs and property types require a broker who understands the VIC market. From first-home buyers in the outer east to investors in the inner north, our Melbourne brokers tailor every loan strategy to match your goals.', '/images/melbourne_real.png', 'Book Free Consultation', '#enquiry', 'Check Borrowing Power', '/borrowing-power-calculator', '[]'),
('/branches/brisbane', 'Mortgage Xperts Brisbane | Home Loans in Queensland', 'Brisbane\'s trusted mortgage brokers. Compare 40+ lenders, access local government grants and secure the best home loan rate in QLD. Free consultation.', 'mortgage broker Brisbane, home loans Brisbane, QLD mortgage broker, Nepali mortgage broker Brisbane, first home buyer Brisbane', 'Brisbane Branch', 'Home Loans in Brisbane', 'Brisbane is booming — fuelled by the 2032 Olympics pipeline and interstate migration. Our Brisbane brokers are embedded in the local market, helping buyers, investors and refinancers capitalise on QLD\'s incredible growth story.', '/images/brisbane_real.png', 'Book Free Consultation', '#enquiry', 'Check Borrowing Power', '/borrowing-power-calculator', '[]'),
('/branches/perth', 'Mortgage Xperts Perth | Home Loans in Western Australia', 'Perth\'s trusted mortgage brokers. Compare 40+ lenders, access local government grants and secure the best home loan rate in WA. Free consultation.', 'mortgage broker Perth, home loans Perth, WA mortgage broker, Nepali mortgage broker Perth, first home buyer Perth', 'Perth Branch', 'Home Loans in Perth', 'Perth has recorded some of Australia\'s strongest property price growth in recent years, driven by mining boom wealth, interstate migration, and limited housing stock. Our Perth brokers understand WA\'s unique lending landscape and lender appetite.', '/images/perth_real.png', 'Book Free Consultation', '#enquiry', 'Check Borrowing Power', '/borrowing-power-calculator', '[]'),
('/branches/adelaide', 'Mortgage Xperts Adelaide | Home Loans in South Australia', 'Adelaide\'s trusted mortgage brokers. Compare 40+ lenders, access local government grants and secure the best home loan rate in SA. Free consultation.', 'mortgage broker Adelaide, home loans Adelaide, SA mortgage broker, Nepali mortgage broker Adelaide, first home buyer Adelaide', 'Adelaide Branch', 'Home Loans in Adelaide', 'Adelaide is one of Australia\'s most affordable capital cities for property — and it\'s growing fast. Our Adelaide brokers know SA\'s unique lending environment, government grants, and the suburbs with the strongest growth prospects.', '/images/adelaide_real.png', 'Book Free Consultation', '#enquiry', 'Check Borrowing Power', '/borrowing-power-calculator', '[]');

