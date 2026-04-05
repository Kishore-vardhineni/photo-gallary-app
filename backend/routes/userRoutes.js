const express = require('express');
const { getAllUsers, getFindByUserId, getUpdatedByUserId, getDeleteByUserId, getTotalUsers, getRecentUsers, downloadUsersCSV, downloadUsersExcel } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/getallusers', getAllUsers);
router.get('/getfindbyuserid/:id', getFindByUserId);
router.put('/getupdatedbyuserid/:id', getUpdatedByUserId);
router.delete('/deleteByUserId/:id', getDeleteByUserId);
router.get('/total-users', verifyToken, getTotalUsers);
router.get('/recent-users', verifyToken, getRecentUsers);
router.get('/export/csv', downloadUsersCSV);
router.get('/export/excel', downloadUsersExcel);

module.exports = router;