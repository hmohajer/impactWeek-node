const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller")
const { requireAuth, checkUser } = require("../middleware/authMiddleware");


router.get("*",checkUser);

router.get("/",controller.homepage);

router.get("/smoothies",requireAuth, controller.smoothies);

router.get("/signup", controller.signUp_get);
router.post("/signup", controller.signUp_post);

router.get("/login", controller.login_get);
router.post("/login", controller.login_post);

// router.get("/set-cookies", controller.set_cookies);
// router.get("/read-cookies", controller.read_cookies);

router.get("/logout", controller.logout_get);



router.get("/addQuestion", controller.addQuestion_get);
router.post("/addQuestion", controller.addQuestion);

router.post("/addComment", controller.addComment);

router.get("/question/:id", controller.showQuestion);


router.get("/question/delete/:id", controller.deleteQuestion);


module.exports = router;