const router = require('express').Router();
const cityController = require('../../controllers/city.controller');
const masterController = require("../../controllers/master.controller");
const userController = require("../../controllers/user.controller");
const priceController = require("../../controllers/price.controller");
const {validateIfBodyUndefined, checkUserData, priceValidators} = require('../../validators');

router.use(validateIfBodyUndefined);
router.post("/cities", cityController.create);
router.post("/masters", [checkUserData.checkUserName, checkUserData.checkDuplicateEmail], masterController.create);
router.post("/users", [checkUserData.checkDuplicateEmail, checkUserData.checkUserName, checkUserData.checkUserPassword], userController.create);
router.post("/prices", [priceValidators.checkNewPriceValues], priceController.create);

module.exports = router;