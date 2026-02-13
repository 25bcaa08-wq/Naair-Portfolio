require('dotenv').config();
const mongoose = require('mongoose');
const Portfolio = require('./models/Portfolio');

const seedData = {
  name: 'AKANKSHA NAIR',
  title: 'BCA Student | Kristu Jayanti University',
  about: 'I am currently pursuing my Bachelor of Computer Applications at Kristu Jayanti University. I have a strong interest in computer technology, especially web development and programming. I enjoy learning new concepts and applying them to create simple applications and websites. I am a quick learner, hardworking, and always willing to improve my technical and problem-solving skills.',
  objective: 'To build a career in the IT industry where I can apply my technical knowledge, learn new technologies, and contribute effectively to the organization while continuously improving my skills.',
  skills: [
    'HTML & CSS',
    'JavaScript (Basics)',
    'Python (Basics)',
    'MySQL Database',
    'Basic Java Programming',
    'MS Office'
  ],
  education: [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Kristu Jayanti University',
      years: '2025 – 2028'
    },
    {
      degree: 'Higher Secondary Education',
      institution: 'Vivekananda Kendra Vidyalaya',
      years: '2023 – 2025'
    }
  ],
  projects: [
    {
      title: 'Personal Portfolio Website',
      description: 'Created a personal portfolio website to display profile, skills, and contact information.'
    }
  ],
  strengths: [
    'Quick learner',
    'Good communication skills',
    'Teamwork',
    'Time management',
    'Problem solving ability'
  ],
  interests: [
    'Web designing',
    'Learning new technologies',
    'Listening to music',
    'Exploring software tools'
  ],
  personal: {
    name: 'Akanksha P Nair',
    nationality: 'Indian',
    languages: 'English, Hindi'
  },
  contact: {
    email: 'nairakanksha2506@gmail.com',
    phone: '+91 9741172180',
    location: 'Andaman & Nicobar Island, South Andaman, Port Blair, India',  // Update if needed
    birthday: 'November 25, 2006'
  },
  socials: {
    linkedin: 'https://www.linkedin.com/in/akanksha-p-nair-342221374',
    github: 'https://github.com/25bcaa08-wq',
    instagram: 'https://www.instagram.com/nair_kanksha_/'
  }
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    await Portfolio.deleteMany({});

    const existing = await Portfolio.findOne();
    if (existing) {
      console.log('Data already exists. Skipping insert. (You can delete existing first if needed)');
    } else {
      await Portfolio.create(seedData);
      console.log('Portfolio data inserted successfully!');
    }
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();