const { Enquiry } = require('../models');

const submitPublic = async (req, res) => {
  try {
    const { name, email, courseInterest } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      courseInterest: courseInterest || null,
      claimed: false,
      counselorId: null
    });

    return res.status(201).json({ message: 'Enquiry submitted', enquiry });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getPublic = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({ where: { claimed: false } });
    return res.status(200).json({ enquiries });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getPrivate = async (req, res) => {
  try {
    const counselorId = req.user;
    const enquiries = await Enquiry.findAll({ where: { counselorId } });
    return res.status(200).json({ enquiries });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const claimLead = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const counselorId = req.user;

    const enquiry = await Enquiry.findByPk(enquiryId);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    if (enquiry.claimed === true) {
      return res.status(409).json({ message: 'This lead has already been claimed.' });
    }

    enquiry.claimed = true;
    enquiry.counselorId = counselorId;
    await enquiry.save();

    return res.status(200).json({ message: 'Lead claimed successfully', enquiry });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { submitPublic, getPublic, getPrivate, claimLead };
