export interface CreateExpenseDataType {
  description: string;
  date: string;
  price: number;
}

export interface Expense {
  id: string;
  description: string;
  date: string;
  price: number;
}

export interface PaginatedExpenses {
  results: Expense[];
  count: number;
  next?: string;
  previous?: string;
}
