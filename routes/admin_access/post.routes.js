const router = require('express').Router();
const cityController = require('../../controllers/city.controller');
const masterController = require("../../controllers/master.controller");
const userController = require("../../controllers/user.controller");
const {validateIfBodyUndefined, checkUserData} = require('../../validators');

router.use(validateIfBodyUndefined);
router.post("/cities", cityController.create);
router.post("/masters", [checkUserData.checkUserName, checkUserData.checkDuplicateEmail], masterController.create);
router.post("/users", [checkUserData.checkDuplicateEmail, checkUserData.checkUserName, checkUserData.checkUserPassword], userController.create);

module.exports = router;