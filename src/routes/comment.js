const router = require("express").Router();
const commentController = require("../controllers/CommentController");
const auth = require('../middlewares/auth')

router.post("/", auth, commentController.create);
router.get("/:postId", auth, commentController.getCommentsByPost);
router.delete("/:commentId", auth, commentController.remove);
router.post("/:commentId/reaction", auth, commentController.reaction);

module.exports = router;
