const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')

const userController = require('../controllers/UserController');

//done
router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
router.get('/getInfo/:userId', auth, userController.getInfo)
router.get('/getInfo', auth, userController.getCurrentUser)
router.get('/suggested', auth, userController.getSuggestedUsers)

//done
router.put('/', auth, userController.updateProfile)
router.post('/follow', auth, userController.follow)
router.post('/unfollow', auth, userController.unfollow)
router.get('/search', auth, userController.search)

module.exports = router;