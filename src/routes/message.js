const router = require("express").Router();
const messageController = require("../controllers/MessageController");
const auth = require('../middlewares/auth')

//done
router.post("/", auth, messageController.create);
router.get("/:conversationId", auth, messageController.getMessagesOfConversation);

module.exports = router;
