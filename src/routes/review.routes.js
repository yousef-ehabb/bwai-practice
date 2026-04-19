const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/product/:productId', reviewController.getProductReviews);
router.post('/', authenticate, reviewController.addReview);

module.exports = router;
