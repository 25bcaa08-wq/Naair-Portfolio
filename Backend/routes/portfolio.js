const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const Contact = require('../models/Contact');


router.get('/', async (req, res) => {
  try {
    const data = await Portfolio.findOne(); 
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/contact', async (req, res) => {
  const { fullname, email, message } = req.body;

  if (!fullname || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newMessage = new Contact({
      fullname,
      email,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      message: 'Thank you! Your message has been received.',
      data: newMessage,
    });
  } catch (error) {
    console.error('Error saving contact message:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.get('/contact', async (req, res) => {
  try {
    const messages = await Contact.find()
      .sort({ submittedAt: -1 })
      .limit(50);

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

module.exports = router;
