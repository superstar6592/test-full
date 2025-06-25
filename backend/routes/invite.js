const express = require('express');
const router = express.Router();
const { createInvite, joinServer } = require('../controllers/inviteController');

// Create Invite
router.post('/create', createInvite);

// Join Server with Invite Link
router.post('/join/:token', joinServer);

module.exports = router;
