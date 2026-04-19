export type Category = 'Electronics' | 'Fashion' | 'Home' | 'Beauty' | 'Sports';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  category: Category;
  stock: number;
  isFeatured?: boolean;
  isNew?: boolean;
  details: {
    brand: string;
    model?: string;
    [key: string]: any;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: CartItem[];
  shippingAddress: Address;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
