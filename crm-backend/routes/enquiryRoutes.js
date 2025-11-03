const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth');
const { submitPublic, getPublic, getPrivate, claimLead } = require('../controllers/enquiryController');

// Public submit - no auth
router.post('/public', submitPublic);

// Get public (unclaimed)
router.get('/public', getPublic);

// Protected routes
router.get('/private', protect, getPrivate);
router.patch('/:id/claim', protect, claimLead);

module.exports = router;
