const express = require('express');
const { getAllUsers, getFindByUserId, getUpdatedByUserId, deleteByUserId, getTotalUsers, getRecentUsers } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/getallusers', getAllUsers);
router.get('/getfindbyuserid/:id', getFindByUserId);
router.put('/getupdatedbyuserid/:id', verifyToken, getUpdatedByUserId);
router.delete('/deleteByUserId/:id', deleteByUserId);
router.get('/total-users', verifyToken, getTotalUsers);
router.get('/recent-users', verifyToken, getRecentUsers);

module.exports = router;