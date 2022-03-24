const controller = require("../controllers/user.controller");
const router = require('express').Router();

router.get("/", controller.findAll);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;