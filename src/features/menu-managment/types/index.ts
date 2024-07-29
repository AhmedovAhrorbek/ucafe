export interface CreateMenuDataType {
  name: string,
  price: number,
  count: number,
  image: string,
  category: string,
  is_active: boolean
}

export interface FoodCardProps {
  id: number;
  name: string;
  count: number;
  price: number;
  image?: string;
  is_active: boolean;
  formatAmount: (amount: number) => string;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}
