import { Document } from 'mongodb';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: [];
  category: string;
  subCategory: string;
  sizes: [];
  bestSeller: boolean;
  date: number;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  cartData: Record<string, any>;
}

export interface IAdmin extends Document {
  email: string;
  password: string;
}

export interface IProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  bestSeller: boolean;
  sizes: any; // Assuming sizes is an array of strings
  image: any; // Assuming imagesURL is an array of strings
  date: number; // Timestamp
}