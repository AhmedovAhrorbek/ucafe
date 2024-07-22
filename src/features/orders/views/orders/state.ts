import type {
  DroppableID,
  ListName,
  Order,
  OrdersState,
  Position,
} from "../../types";

const id2List: Record<DroppableID, ListName> = {
  droppable: "newOrders",
  droppable2: "inProcessOrders",
  droppable3: "finishedOrders",
};

export default function useOrdersState(): OrdersState {
  return { insertSort, reorder, reorderState, move, getList };
}

function insertSort(position: Position, positions: Position[]): Position[] {
  const result: Position[] = [];
  for (let i = 0; i < positions.length; i += 1) {
    const currPosition = positions[i];
    if (i === position.position_id) {
      result.push(position);
      result.push({
        order_id: currPosition.order_id,
        position_id: currPosition.position_id + 1,
      });
    } else if (i > position.position_id) {
      result.push({
        order_id: currPosition.order_id,
        position_id: currPosition.position_id + 1,
      });
    } else {
      result.push(currPosition);
    }
  }
  return result;
}

function reorder(
  list: Position[],
  startIndex: number,
  endIndex: number
): Position[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result.map((pos, index) => ({
    order_id: pos.order_id,
    position_id: index,
  }));
}

function reorderState(
  list: Order[],
  startIndex: number,
  endIndex: number
): Order[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function move(
  source: Order[],
  destination: Order[],
  droppableSource: { index: number },
  droppableDestination: { index: number }
) {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  return {
    source: sourceClone,
    destination: destClone,
  };
}

function getList(id: DroppableID): ListName {
  return id2List[id];
}
