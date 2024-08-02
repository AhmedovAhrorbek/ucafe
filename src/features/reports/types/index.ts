export type IncomeStatisticsType = {
  total_income: number;
  percentage_change:number;
  title?:string;
};
export type ExpenseStatisticsType = {
  total_expenses: number;
  percentage_change:number;
  title?:string;
};
export type SalesStatisticsType = {
  total_sales: number;
  percentage_change: number;
  title?:string;
};

export type OrdersStatisticsType = {
  takeout_orders: number;
  delivery_orders: number;
  tekout_title?:string;
  delivery_title?:string;
  takeout_percentage_change: number;
  delivery_percentage_change:number;
};

export interface PaymentMethodsStatisticsType {
  pay_type: string;
  count: number;
  total_amount: number;
  percentage: number;
  title?:string;
}


export interface CategoryStatisticsType {
  category: string,
  count: number,
  total_amount: number,
  percentage_quantity: number,
  title?:string;
}

export interface SoldItemsStatiticsType {
  name: string;
  category: string;
  total_quantity: number;
  price_per_unit: number;
  total_sales: number;
  title?:string;
}

export interface SalesByDayWeekStatisticsType {
  monday: {
    takeout: number;
    delivery: number;
  };
  tuesday: {
    takeout: number;
    delivery: number;
  };
  wednesday: {
    takeout: number;
    delivery: number;
  };
  thursday: {
    takeout: number;
    delivery: number;
  };
  friday: {
    takeout: number;
    delivery: number;
  };
  saturday: {
    takeout: number;
    delivery: number;
  };
  sunday: {
    takeout: number;
    delivery: number;
  };
}