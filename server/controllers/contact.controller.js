const Contact = require('../models/Contact');

const submitContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ message: 'Message received successfully', contact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { submitContact };
