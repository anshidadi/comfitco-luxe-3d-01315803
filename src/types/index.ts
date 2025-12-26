export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'casual' | 'party-wear' | 'ethnic' | 'trendy';
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  customerName: string;
  mobileNumber: string;
  address: string;
  size: string;
  quantity: number;
  message?: string;
  createdAt: Date;
}

export type Category = 'all' | 'casual' | 'party-wear' | 'ethnic' | 'trendy';
