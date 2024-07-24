type HistoryCardData = {
  created_at: string;
  full_price: string;
  id: number;
  order_type: string;
  pay_type: string;
  status_pay: string;
  position:number,
};

export type HistoryCardProps = {
  data: HistoryCardData;
};

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}