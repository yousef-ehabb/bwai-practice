const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.use(authenticate); // All cart routes require login

router.get('/', cartController.getCart);
router.post('/add', cartController.addItemToCart);
router.put('/items/:itemId', cartController.updateCartItem);
router.delete('/items/:itemId', cartController.removeCartItem);
router.delete('/clear', cartController.clearCart);

module.exports = router;
