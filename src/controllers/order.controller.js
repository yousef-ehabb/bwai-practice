const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.body;

    // 1. Get Cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } }
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // 2. Validate Stock & Calculate Totals
    let subtotal = 0;
    const orderItemsData = [];

    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${item.product.name}` 
        });
      }
      
      const price = item.product.discountPrice || item.product.price;
      subtotal += Number(price) * item.quantity;
      
      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: price
      });
    }

    const shippingFee = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const total = subtotal + shippingFee;

    // 3. Create Order in Transaction
    const order = await prisma.$transaction(async (tx) => {
      // Decrement stock
      for (const item of cart.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      // Create order
      const newOrder = await tx.order.create({
        data: {
          userId,
          addressId,
          subtotal,
          shippingFee,
          total,
          status: 'PROCESSING', // Mock paid
          items: {
            create: orderItemsData
          }
        },
        include: { items: true }
      });

      // Clear cart
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return newOrder;
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: { 
        items: { include: { product: true } },
        address: true,
        user: { select: { name: true, email: true } }
      }
    });

    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    // Check ownership or admin
    if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

const getAllOrdersAdmin = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await prisma.order.update({
      where: { id },
      data: { status }
    });
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrdersAdmin,
  updateOrderStatus
};
