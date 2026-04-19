const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { addresses: true }
    });
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const getAddresses = async (req, res, next) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.user.id }
    });
    res.json({ success: true, data: addresses });
  } catch (error) {
    next(error);
  }
};

const addAddress = async (req, res, next) => {
  try {
    const { street, city, state, postalCode, country, isDefault } = req.body;
    
    // If setting as default, unset others
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: req.user.id },
        data: { isDefault: false }
      });
    }

    const address = await prisma.address.create({
      data: {
        userId: req.user.id,
        street, city, state, postalCode, country, isDefault
      }
    });

    res.status(201).json({ success: true, data: address });
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.isDefault) {
      await prisma.address.updateMany({
        where: { userId: req.user.id },
        data: { isDefault: false }
      });
    }

    const address = await prisma.address.update({
      where: { id, userId: req.user.id },
      data: updateData
    });

    res.json({ success: true, data: address });
  } catch (error) {
    next(error);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.address.delete({ where: { id, userId: req.user.id } });
    res.json({ success: true, message: 'Address deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress
};
