const router = require("express").Router();
const activityController = require("../controllers/ActivityController");
const auth = require('../middlewares/auth')

//done
router.post("/", auth, activityController.create);
router.get("/", auth, activityController.getActivities);

module.exports = router;
