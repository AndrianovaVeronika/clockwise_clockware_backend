const db = require("../api");
const express = require("express");
const router = express.Router();

router.get('/orders', db.getOrders);
router.get('/orders/get-order-by-id/:id', db.getOrderById);
router.get('/orders/get-occupied-hours/:master_id/:date', db.getOrdersByDateAndMaster);
router.post('/orders', db.createOrder);
// app.put('/orders/:id', db.updateOrder);
router.delete('/orders/:id', db.deleteOrder);

module.exports = router;