const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const nodemailer = require('nodemailer');

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

  console.log('Received contact form:', { fullname, email, message }); // ← debug

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log('Using email credentials:', {
    user: process.env.EMAIL_USER || '[MISSING]',
    pass: process.env.EMAIL_PASS ? '[SET]' : '[MISSING]',
  }); // ← very important debug line

  let mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `Contact Form Submission from ${fullname}`,
    text: `From: ${email}\n\nMessage:\n${message}`,
    replyTo: email,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email send failed:', err.message, err.stack);
    res.status(500).json({ message: 'Error sending email', error: err.message });
  }
});

module.exports = router;