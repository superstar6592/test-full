// routes/channelRoute.js
const express = require('express');

const { createChannel, editChannel, deleteChannel, getChannels,leaveChannel } = require('../controllers/channelController');
const upload = require('../middlewares/uploadMiddleware');  // Import your customized multer config
const router = express.Router();

router.post('/create', upload.single('file'), createChannel);
router.put('/:id', upload.single('file'), editChannel);
router.get('/:serverId', getChannels);
router.delete('/:id', deleteChannel);

module.exports = router;

