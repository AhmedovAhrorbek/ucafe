import request from "../../../utils/axios";

import { CreateExpenseDataType, PaginatedExpenses, Expense } from "../types";

export const createExpense = async (
  data: CreateExpenseDataType
): Promise<void> => {
  await request({
    url: "expenses/",
    method: "post",
    data,
  });
};

export const getExpenses = async (
  page: number,
  page_size: number,
//   start_date?:string,
//   end_date?:string,
): Promise<PaginatedExpenses> => {
  const response = await request({
    url: `expenses/`,
    method: "get",
    params: {
      page,
      page_size,
      //   start_date,
      //   end_date,
    },
  });
  return response;
};

export const getExpenseById = async (id: string): Promise<Expense> => {
  const response = await request({
    url: `expenses/${id}/`,
    method: "get",
  });
  return response;
};

export const updateExpense = async (
  id: string,
  data: CreateExpenseDataType
): Promise<void> => {
  await request({
    url: `expenses/${id}/`,
    method: "put",
    data,
  });
};

export async function deleteExpense(id: number): Promise<void> {
  await request({
    url: `expenses/${id}/`,
    method: "delete",
  });
}

