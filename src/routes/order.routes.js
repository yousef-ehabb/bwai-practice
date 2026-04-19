const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.use(authenticate);

router.post('/', orderController.createOrder);
router.get('/my-orders', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);

// Admin only
router.get('/', authorize('ADMIN'), orderController.getAllOrdersAdmin);
router.patch('/:id/status', authorize('ADMIN'), orderController.updateOrderStatus);

module.exports = router;
