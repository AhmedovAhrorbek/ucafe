import { produce } from "immer";

interface Cart {
  items: CartItem[];
}

interface CartItem {
  id: number;
  name: string;
  count: number;
  price?: number;
  img?: string;
}
// Cart reducer
export const cartReducer = (
  state: Cart[],
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "ADD_CART":
      return [...state, { items: [] }];
    case "REMOVE_CART":
      return state.filter((_, i) => i !== action.payload);
    case "ADD_ITEM": {
      const { cartIndex, item } = action.payload;
      return produce(state, (draft) => {
        const existingItem = draft[cartIndex].items.find(
          (i) => i.id === item.id
        );
        if (existingItem) {
          existingItem.count += 1;
        } else {
          draft[cartIndex].items.push({ ...item, count: 1 });
        }
      });
    }
    case "REMOVE_ITEM": {
      const { cartIndex, itemId } = action.payload;
      return produce(state, (draft) => {
        const existingItem = draft[cartIndex].items.find(
          (i) => i.id === itemId
        );
        if (existingItem && existingItem.count > 1) {
          existingItem.count -= 1;
        } else {
          draft[cartIndex].items = draft[cartIndex].items.filter(
            (i) => i.id !== itemId
          );
        }
      });
    }
    case "REMOVE_ALL_ITEMS": {
      const { cartIndex } = action.payload;
      return produce(state, (draft) => {
        draft[cartIndex].items = [];
      });
    }
    default:
      return state;
  }
};
