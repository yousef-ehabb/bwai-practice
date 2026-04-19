const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // 1. Categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: { name: 'Electronics', slug: 'electronics' }
  });

  const books = await prisma.category.upsert({
    where: { slug: 'books' },
    update: {},
    create: { name: 'Books', slug: 'books' }
  });

  const fashion = await prisma.category.upsert({
    where: { slug: 'fashion' },
    update: {},
    create: { name: 'Fashion', slug: 'fashion' }
  });

  // 2. Products
  const sampleProducts = [
    {
      name: 'iPhone 15 Pro',
      slug: 'iphone-15-pro',
      description: 'The latest iPhone with titanium design and A17 Pro chip.',
      price: 999.99,
      stock: 50,
      brand: 'Apple',
      isFeatured: true,
      categoryId: electronics.id,
      images: ['https://placehold.co/600x400/png?text=iPhone+15+Pro']
    },
    {
      name: 'Sony WH-1000XM5',
      slug: 'sony-wh-1000xm5',
      description: 'Industry-leading noise canceling headphones.',
      price: 349.99,
      discountPrice: 299.99,
      stock: 100,
      brand: 'Sony',
      isFeatured: true,
      categoryId: electronics.id,
      images: ['https://placehold.co/600x400/png?text=Sony+XM5']
    },
    {
      name: 'Clean Code',
      slug: 'clean-code',
      description: 'A Handbook of Agile Software Craftsmanship by Robert C. Martin.',
      price: 35.50,
      stock: 200,
      brand: 'Prentice Hall',
      isFeatured: false,
      categoryId: books.id,
      images: ['https://placehold.co/600x400/png?text=Clean+Code']
    }
  ];

  for (const product of sampleProducts) {
    const { images, ...data } = product;
    await prisma.product.upsert({
      where: { slug: data.slug },
      update: data,
      create: {
        ...data,
        images: {
          create: images.map(url => ({ url }))
        }
      }
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
