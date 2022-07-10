export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  category: string;
}

export type orderStatus = "active" | "complete";

export interface Order {
  id?: number;
  status: orderStatus;
  user_id: number;
}
