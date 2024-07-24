import React from "react";
import { Pagination as AntPagination } from "antd";
import { PaginationProps } from "../features/order-history/types";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-center mt-3 mb-5">
      <AntPagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default Pagination;
