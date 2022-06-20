const router = require('express').Router();
const cityController = require('../../controllers/city.controller');
const masterController = require("../../controllers/master.controller");
const userController = require("../../controllers/user.controller");
const {validateIfBodyUndefined} = require('../../validators');

router.use(validateIfBodyUndefined);
router.post("/cities", cityController.create);
router.post("/masters", masterController.create);
router.post("/users", userController.create);

module.exports = router;