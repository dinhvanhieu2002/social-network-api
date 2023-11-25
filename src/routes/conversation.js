const router = require("express").Router();
const conversationController = require("../controllers/ConversationController");
const auth = require('../middlewares/auth')

//done
router.post("/", auth, conversationController.create);
router.get("/", auth, conversationController.getList);
router.get("/:conversationId", auth, conversationController.getConversationById);
router.get("/user/:userId", auth, conversationController.getConversationByUsers);
router.put('/:conversationId', auth, conversationController.update)
router.delete('/:conversationId', auth, conversationController.remove)

module.exports = router;
