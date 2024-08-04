import request from "../../../utils/axios";
import { CreateMenuDataType, FoodCardProps } from "../types";

export async function createMenu(data: CreateMenuDataType): Promise<void> {
  await request({
    url: "foods/",
    method: "post",
    data,
  });
}


// Delete menu function
export async function deleteMenu(id: number): Promise<void> {
  await request({
    url: `foods/${id}/`,
    method: "delete",
  });
}


// Get food by ID function
export async function getFoodById(id: number): Promise<FoodCardProps> {
  const response = await request({
    url: `foods/${id}/`,
    method: "get",
  });
  return response;
}


////// Update Menu /////////
export async function updateMenu(
  id: number,
  formData: FormData
): Promise<void> {
  await request({
    url: `foods/${id}/`,
    method: "patch",
    data: formData,
  });
}