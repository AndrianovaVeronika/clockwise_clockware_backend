const router = require('express').Router();
const orderController = require("../../controllers/order.controller");
const {
    ifBodyUndefined,
    verifyTokenAndExtractUserId,
    roleValidator,
    ifOrderBelongToMaster
} = require("../../validators");

router.use(ifBodyUndefined);

router.put("/master/orders/:id",
    [verifyTokenAndExtractUserId, roleValidator.isMaster, ifOrderBelongToMaster],
    orderController.update);

module.exports = router;