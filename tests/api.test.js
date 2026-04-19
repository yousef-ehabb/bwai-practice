const request = require('supertest');

// Mock Prisma
const mockPrisma = {
  product: {
    findMany: jest.fn(),
    count: jest.fn(),
    findUnique: jest.fn()
  },
  category: {
    findMany: jest.fn()
  },
  user: {
    findUnique: jest.fn()
  }
};

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => mockPrisma)
  };
});

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ sub: 'mock-user-id', role: 'ADMIN' })
}));

const app = require('../src/index');

describe('Amazon Clone API Tests', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('should return welcome message', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Welcome to Amazon Clone API');
    });
  });

  describe('GET /api/products', () => {
    it('should fetch paginated products', async () => {
      // Mock db response
      mockPrisma.product.findMany.mockResolvedValue([
        { id: 1, name: 'Test Product', price: 99 }
      ]);
      mockPrisma.product.count.mockResolvedValue(1);

      const res = await request(app).get('/api/products?page=1&limit=10');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.pagination.total).toBe(1);
    });
  });

  describe('GET /api/categories', () => {
    it('should fetch categories', async () => {
      mockPrisma.category.findMany.mockResolvedValue([
        { id: '1', name: 'Electronics', slug: 'electronics' }
      ]);

      const res = await request(app).get('/api/categories');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data[0].slug).toEqual('electronics');
    });
  });

});
