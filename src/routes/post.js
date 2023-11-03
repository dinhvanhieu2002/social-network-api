const router = require("express").Router();
const postController = require("../controllers/PostController");
const auth = require('../middlewares/auth')

//done
router.post("/", auth, postController.create);
router.get("/", auth, postController.getPosts);
router.get("/user/:userId", auth, postController.getPostsOfUser);
router.get("/:postId", auth, postController.getPostById);
router.post("/:postId/like", auth, postController.likePost);
router.post("/:postId/unlike", auth, postController.unlikePost);
router.delete("/:postId", auth, postController.remove);
router.put('/:postId', auth, postController.update)

module.exports = router;
