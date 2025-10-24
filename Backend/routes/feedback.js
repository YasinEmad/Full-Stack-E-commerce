const express = require('express');
const router = express.Router();
const { sendFeedbackEmail } = require('../services/emailService');

// POST /api/feedback
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const result = await sendFeedbackEmail({ name, email, message });

  if (result.success) {
    res.json({ success: true, message: 'Feedback sent successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to send feedback' });
  }
});

module.exports = router;
