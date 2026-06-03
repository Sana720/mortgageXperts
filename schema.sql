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
