// backend/seed-delete-messages.js
require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./models/Contact');

async function deleteAllMessages() {
  try {
    // Connect without deprecated options
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas');

    // Count before
    const countBefore = await Contact.countDocuments();
    console.log(`Found ${countBefore} contact messages before deletion`);

    if (countBefore === 0) {
      console.log('No messages to delete. Collection is already empty.');
      return;
    }

    // Delete everything
    const result = await Contact.deleteMany({});
    console.log(`Successfully deleted ${result.deletedCount} messages`);

    // Verify
    const countAfter = await Contact.countDocuments();
    console.log(`Messages left after deletion: ${countAfter}`);

  } catch (error) {
    console.error('Real error during deletion:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

deleteAllMessages();