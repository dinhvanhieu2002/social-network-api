const router = require("express").Router();
const postController = require("../controllers/PostController");
const auth = require('../middlewares/auth')

//done
router.post("/", auth, postController.create);
router.get("/", auth, postController.getPosts);
router.get("/:userId", auth, postController.getPostsOfUser);
router.get("/:postId", auth, postController.getPostById);
router.post("/:postId/reaction", auth, postController.reaction);
router.delete("/:postId", auth, postController.remove);
router.put('/:postId', auth, postController.update)

module.exports = router;
