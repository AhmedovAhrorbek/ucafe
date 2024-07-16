import type {
  BaseParams,
  DeliveryStatus,
  OrderStatus,
  OrderType,
  PaymentStatus,
  ProductDay,
} from "../../../types";

interface Order {
  id: number;
  type: OrderType;
  created_at: string;
  is_user_pay: boolean;
  items: OrderItem[];
  status: OrderStatus;
  delivery_status: DeliveryStatus;
  user: User;
  payment_status: PaymentStatus;
  payment_type: PaymentType;
  total: number;
  address: string;
  block: string;
  cabinet: string;
  cash: number;
  phone: string;
  position: string;
  source: string;
  transaction_link: string;
}

interface OrderItem {
  id: number;
  qty: number;
  product: Product;
  price: number;
}

interface Product {
  id: number;
  category_id: number;
  day: ProductDay;
  image: string;
  price: number;
  qty: number;
  status: boolean;
  translations: {
    ru: { name: string; description: string };
    uz: { name: string; description: string };
    en: { name: string; description: string };
  };
}

interface User {
  id: number;
  phone: string;
  first_name: string;
  username: string;
  is_active: boolean;
  password: string;
  position: string;
}

interface CreateOrderData {
  products?: Array<{ product: number; qty: number }>;
  type?: OrderType;
  payment_type?: number;
  payment_status?: PaymentStatus;
  block?: string;
  phone?: string;
  cabinet?: string;
  position?: string;
  source: "web_admin";
  created_at?: string;
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

interface EditOrderData {
  products: Array<{ product: number; qty: number }>;
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

interface Category {
  id: number;
  status: boolean;
  translations: { ru: { name: string } };
  product: Product[];
}

interface ChequeData extends Order {
  available: number;
  check_number: string;
  discount: number;
  fiscal_number: string;
  fm_id: string;
  inn: string;
  nds: number;
  sale_number: number;
  terminal: string;
}

interface Position {
  order_id: number;
  position_id: number;
}

type DroppableID = "droppable" | "droppable2" | "droppable3";

type ListName = "new" | "in_process" | "finished";

interface DropResult {
  source: { droppableId: DroppableID; index: number };
  destination: { droppableId: DroppableID; index: number } | null;
}

interface OrdersState {
  insertSort: (position: Position, positions: Position[]) => Position[];
  reorder: (
    list: Position[],
    startIndex: number,
    endIndex: number
  ) => Position[];
  reorderState: (
    list: Order[],
    startIndex: number,
    endIndex: number
  ) => Order[];
  move: () => void;
  getList: (id: DroppableID) => ListName;
}

export type {
  Order,
  Product,
  CreateOrderData,
  UpdateOrderData,
  OrderItem,
  PaymentType,
  OrdersParams,
  Category,
  ChequeData,
  Position,
  EditOrderData,
  DroppableID,
  ListName,
  DropResult,
  OrdersState,
};
