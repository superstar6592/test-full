const express = require('express');
const { createServer, getServers, deleteServer, editServer ,getUsers,leaveServer,getServerOwner,getServerCreatedandInvited} = require('../controllers/serverController');
const router = express.Router();

router.post('/create', createServer);
router.get('/:id', getServers);
router.delete('/:id', deleteServer);
router.put('/leave/:id', leaveServer);
router.put('/:id', editServer);
router.get('/:id/users',getUsers)
router.get("/owner/:id", getServerOwner);

module.exports = router;