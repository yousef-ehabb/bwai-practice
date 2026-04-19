import { Product, Category, Review } from '@/types';

export const CATEGORIES: Category[] = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Quantum Sound Wireless Headphones',
    description: 'Experience immersive studio-quality sound with active noise cancellation and 40-hour battery life.',
    price: 299.99,
    discountPrice: 249.99,
    rating: 4.8,
    reviewCount: 1240,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Electronics',
    stock: 15,
    isFeatured: true,
    isNew: true,
    details: {
      brand: 'Quantum',
      model: 'Q-Sound Pro',
      color: 'Midnight Black',
      connectivity: 'Bluetooth 5.2',
    }
  },
  {
    id: '2',
    title: 'Everest Peak Hiking Backpack',
    description: 'Durable, waterproof 50L backpack designed for the ultimate outdoor adventure.',
    price: 129.50,
    rating: 4.6,
    reviewCount: 850,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Sports',
    stock: 24,
    details: {
      brand: 'Everest',
      material: 'Nylon 600D',
      capacity: '50L',
    }
  },
  {
    id: '3',
    title: 'Vogue Silk Summer Dress',
    description: 'Elegant and lightweight silk dress perfect for summer evenings and garden parties.',
    price: 89.00,
    discountPrice: 65.00,
    rating: 4.9,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Fashion',
    stock: 40,
    isFeatured: true,
    details: {
      brand: 'Vogue',
      material: '100% Silk',
      size: 'S, M, L, XL',
    }
  },
  {
    id: '4',
    title: 'Nova Glow Smart Desk Lamp',
    description: 'Adjustable brightness and color temperature with built-in wireless charging pad.',
    price: 55.99,
    rating: 4.7,
    reviewCount: 615,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Home',
    stock: 50,
    isNew: true,
    details: {
      brand: 'Nova',
      features: 'Wireless Charging, App Control',
    }
  },
  {
    id: '5',
    title: 'Precision Pro Mechanical Keyboard',
    description: 'Hot-swappable switches, RGB lighting, and premium aluminum frame for serious gamers and typists.',
    price: 159.00,
    rating: 4.8,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Electronics',
    stock: 12,
    details: {
      brand: 'Precision',
      switches: 'Cherry MX Brown',
    }
  },
  {
    id: '6',
    title: 'Radiance Skin Gold Serum',
    description: 'Revitalize your skin with 24K gold flakes and hyaluronic acid for a natural glow.',
    price: 45.00,
    discountPrice: 38.00,
    rating: 4.5,
    reviewCount: 220,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Beauty',
    stock: 100,
    details: {
      brand: 'Radiance',
      volume: '30ml',
    }
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userName: 'Alex Johnson',
    rating: 5,
    comment: 'The best headphones I have ever owned. The noise cancellation is magical!',
    date: '2023-10-15'
  },
  {
    id: 'r2',
    productId: '1',
    userName: 'Sarah Miller',
    rating: 4,
    comment: 'Excellent sound quality, though the ear cups can get a bit warm after long use.',
    date: '2023-11-02'
  }
];
