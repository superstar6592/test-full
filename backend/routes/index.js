// routes/index.js
const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const projectRouter = require('./project');
const proposalRouter = require('./proposal');
const tmProjectRouter = require('./tmProject');
const messageRouter = require('./messageRoute');
const serverRouter = require('./serverRoute');
const channelRouter = require('./channel');
const authMiddleware = require('../middlewares/authMiddleware');
const paymentRoute = require("./payment");
const friendRequest = require('./friendRequest');
const invite = require('./invite');
const callRoute = require('./call')


router.get('/example', (req, res) => {
    res.json({ message: 'Example route ' });
});

router.use('/auth', authRouter);
router.use('/users', userRouter);

router.use('/projects',authMiddleware,  projectRouter);
router.use('/proposals',authMiddleware,  proposalRouter);
router.use('/tmProjects',authMiddleware,  tmProjectRouter);
router.use('/messages',authMiddleware, messageRouter);
router.use('/servers',authMiddleware,  serverRouter);
router.use('/channels',authMiddleware, channelRouter);
router.use('/payments',  paymentRoute);
router.use('/friendRequests',authMiddleware,friendRequest);
router.use('/invites',authMiddleware,invite);
router.use('/call',authMiddleware, callRoute);

module.exports = router;