import type {
  BaseParams,
  // DeliveryStatus,
  OrderStatus,
  OrderType,
  PaymentStatus,
} from "../../../types";


interface Order {
  id: number;
  delivery_status?: string;
  full_price?: string;
  items?: [];
  order_type?: string;
  pay_type?: string;
  status?: string;
  status_pay?: string;
}
interface UpdateOrderData {
  pay_type?: string; 
  status?: string; 
  order_type?: string; 
  items?: Array<{
    food_id: number; 
    quantity: number; 
  }>;
  status_pay?: string;
}





 interface CreateOrderData {
  pay_type: string;
  status: string;
  order_type: string;
  items: { food_id: number; quantity: number }[];
  status_pay: string;
}

interface UpdateOrderData {
  products?: Array<{ product: number; qty: number }>;
  type?: OrderType;
  payment_type?: number;
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  block?: string;
  phone?: string;
  cabinet?: string;
  position?: string;
}



interface PaymentType {
  id: number;
  translations: { ru: { name: string } };
  is_cash: boolean;
  image: string;
  status: boolean;
}

interface OrdersParams extends BaseParams {
  payment_status?: PaymentStatus | undefined;
  payment_type?: number;
  status?: OrderStatus;
  type?: OrderType;
  min_date?: string;
  max_date?: string;
  date?: string;
}











interface Food {
  results:[
     id: number,
     name: string,
     price: number,
     count: number,
     is_active: boolean,
     category: string,
     photos: string[],
  ],
  
}

export type {
  Food,
  Order,
  CreateOrderData,
  UpdateOrderData,
  PaymentType,
  OrdersParams,
};
