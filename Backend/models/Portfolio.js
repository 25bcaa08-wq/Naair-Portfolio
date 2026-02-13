const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: String,
  title: String,
  about: String,
  objective: String,
  skills: [String],
  education: [{
    degree: String,
    institution: String,
    years: String
  }],
  projects: [{
    title: String,
    description: String
  }],
  strengths: [String],
  interests: [String],
  personal: {
    name: String,
    nationality: String,
    languages: String
  },
  contact: {
    email: String,
    phone: String,
    location: String,
    birthday: String
  },
  socials: {
    linkedin: String,
    github: String,
    instagram: String
  }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);