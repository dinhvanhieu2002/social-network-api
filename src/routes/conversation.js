const router = require("express").Router();
const conversationController = require("../controllers/ConversationController");
const auth = require('../middlewares/auth')

//done
router.post("/", auth, conversationController.create);
router.get("/", auth, conversationController.getList);
router.put('/:conversationId', auth, conversationController.update)
router.delete('/:conversationId', auth, conversationController.remove)

module.exports = router;
