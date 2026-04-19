const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addReview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, rating, comment } = req.body;

    // Check if user already reviewed
    const existing = await prisma.review.findFirst({
      where: { userId, productId }
    });

    if (existing) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = await prisma.review.create({
      data: { userId, productId, rating, comment }
    });

    // Update product rating (simple average calculation)
    const reviews = await prisma.review.findMany({ where: { productId } });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await prisma.product.update({
      where: { id: productId },
      data: { 
        rating: avgRating,
        reviewCount: reviews.length
      }
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await prisma.review.findMany({
      where: { productId },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReview,
  getProductReviews
};
