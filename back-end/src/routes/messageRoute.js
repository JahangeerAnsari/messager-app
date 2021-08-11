const { getConversations } = require('../controllers/messageController');

const router = require('express').Router();

router.get("/conversations/:senderId/:receiverId", getConversations);

module.exports = router;