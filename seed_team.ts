const { executeQuery } = require('./lib/db');
const crypto = require('crypto');

const defaultMembers = [
  {
    name: "Aakash KC",
    role: "The Mortgage Mate | Founder & Principal Broker",
    image: "/images/aakash_new.png",
    email: "aakash@mortgagexperts.com.au",
    phone: "0450 240 757",
    bio: "As the founder of Mortgage Xperts and widely known as 'The Mortgage Mate', Aakash brings years of dedicated experience to the Australian mortgage industry. With a passion for empowering the Nepali community and all Australians, he has helped hundreds of clients secure their dream homes, build robust investment portfolios, and navigate the complexities of lending with clarity and confidence."
  },
  {
    name: "Rakesh Shrestha",
    role: "Senior Mortgage Broker",
    image: "https://ui-avatars.com/api/?name=Rakesh+Shrestha&background=042052&color=fff&size=512",
    email: "rakesh@mortgagexperts.com.au",
    phone: "1300 000 000",
    bio: "Rakesh is a highly skilled Senior Mortgage Broker known for his analytical approach and deep understanding of the property market. He specializes in helping both first-time buyers and seasoned investors structure their loans for maximum benefit, ensuring long-term financial success and stability."
  },
  {
    name: "Susmita G C",
    role: "Mortgage Broker",
    image: "https://ui-avatars.com/api/?name=Susmita+GC&background=17aae4&color=fff&size=512",
    email: "susmita@mortgagexperts.com.au",
    phone: "1300 000 000",
    bio: "Susmita is dedicated to providing exceptional service and tailored mortgage solutions. With a keen eye for detail and a warm, approachable demeanor, she simplifies the often overwhelming process of securing a home loan, making her clients feel supported every step of the way."
  },
  {
    name: "Utsav Khadka",
    role: "Mortgage Broker",
    image: "https://ui-avatars.com/api/?name=Utsav+Khadka&background=2563eb&color=fff&size=512",
    email: "utsav@mortgagexperts.com.au",
    phone: "1300 000 000",
    bio: "Utsav is a passionate Mortgage Broker who thrives on helping individuals and families achieve their property goals. Whether it's finding the most competitive interest rate or guiding clients through their first property purchase, Utsav's commitment to excellence ensures a seamless experience."
  }
];

async function seed() {
  try {
    const existing = await executeQuery('SELECT count(*) as count FROM team_members');
    if (existing[0].count === 0) {
      for (let i = 0; i < defaultMembers.length; i++) {
        const m = defaultMembers[i];
        await executeQuery(
          'INSERT INTO team_members (id, name, role, email, phone, bio, image, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [crypto.randomUUID(), m.name, m.role, m.email, m.phone, m.bio, m.image, i]
        );
      }
      console.log('Seeded team_members');
    } else {
      console.log('team_members already seeded');
    }
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

seed();
