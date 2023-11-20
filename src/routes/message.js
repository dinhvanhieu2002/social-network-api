const router = require("express").Router();
const messageController = require("../controllers/MessageController");
const auth = require('../middlewares/auth')

//done
router.post("/", auth, messageController.create);
router.get("/conversation/:conversationId", auth, messageController.getMessagesOfConversation);
router.get("/:messageId", auth, messageController.getMessageById);

module.exports = router;
