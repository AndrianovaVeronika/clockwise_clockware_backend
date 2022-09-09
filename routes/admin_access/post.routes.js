const router = require('express').Router();
const cityController = require('../../controllers/city.controller');
const masterController = require("../../controllers/master.controller");
const userController = require("../../controllers/user.controller");
const {ifBodyUndefined, userValidator} = require('../../validators');

router.use(ifBodyUndefined);

router.post("/cities", cityController.create);
router.post("/masters", [userValidator.checkUserName, userValidator.checkDuplicateEmail], masterController.create);
router.post("/users", [userValidator.checkDuplicateEmail, userValidator.checkUserName, userValidator.checkUserPassword], userController.create);

module.exports = router;