import { Button } from "antd";
import CheckboxG from "../../assets/Checkbox-green.png";
import CheckboxR from "../../assets/Checkbox-red.png";
import AddCircle from "../../assets/add-circle.png";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Order } from "../../types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import OrderCard from "../../components/OrderCard";
import NoOrders from "../../components/NoOrders";
import useOrdersState from "./state";

const Orders = () => {
  const [newOrders, setNewOrders] = useState<Order[]>([]);
  const [inProcessOrders, setInProcessOrders] = useState<Order[]>([]);
  const [finishedOrders, setFinishedOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  const { reorderState, move, getList } = useOrdersState();

  const { data: newOrdersData } = useQuery({
    queryKey: ["orders", "new"],
    queryFn: async () => {
      const res = await getOrders({ status: "new", page_size: 100 });
      return res.results;
    },
  });

  const { data: inProcessOrdersData } = useQuery({
    queryKey: ["orders", "processing"],
    queryFn: async () => {
      const res = await getOrders({ status: "processing", page_size: 100 });
      return res.results;
    },
  });

  const { data: finishedOrdersData } = useQuery({
    queryKey: ["orders", "completed"],
    queryFn: async () => {
      const res = await getOrders({ status: "completed", page_size: 100 });
      return res.results;
    },
  });

  useEffect(() => {
    setNewOrders(newOrdersData ?? []);
  }, [newOrdersData]);

  useEffect(() => {
    setInProcessOrders(inProcessOrdersData ?? []);
  }, [inProcessOrdersData]);

  useEffect(() => {
    setFinishedOrders(finishedOrdersData ?? []);
  }, [finishedOrdersData]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = {
      newOrders,
      inProcessOrders,
      finishedOrders,
    }[source.droppableId];

    const destList = {
      newOrders,
      inProcessOrders,
      finishedOrders,
    }[destination.droppableId];

    if (!sourceList || !destList) return;

    const { source: updatedSourceList, destination: updatedDestList } = move(
      sourceList,
      destList,
      source,
      destination
    );

    if (source.droppableId === destination.droppableId) {
      const updatedList = reorderState(
        updatedSourceList,
        source.index,
        destination.index
      );

      switch (source.droppableId) {
        case "newOrders":
          setNewOrders(updatedList);
          break;
        case "inProcessOrders":
          setInProcessOrders(updatedList);
          break;
        case "finishedOrders":
          setFinishedOrders(updatedList);
          break;
        default:
          break;
      }
    } else {
      switch (source.droppableId) {
        case "newOrders":
          setNewOrders(updatedSourceList);
          break;
        case "inProcessOrders":
          setInProcessOrders(updatedSourceList);
          break;
        case "finishedOrders":
          setFinishedOrders(updatedSourceList);
          break;
        default:
          break;
      }

      switch (destination.droppableId) {
        case "newOrders":
          setNewOrders(updatedDestList);
          break;
        case "inProcessOrders":
          setInProcessOrders(updatedDestList);
          break;
        case "finishedOrders":
          setFinishedOrders(updatedDestList);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div>
      <div className="bg-white px-[24px] py-[15px] border-b border-gray-200 pb-5">
        <div className="flex items-center justify-between">
          <h1 className="font-sf-pro-display text-[24px] font-semibold leading-[28.64px] text-left">
            Все заказы
          </h1>
          <div className="flex items-center justify-between w-[608px]">
            <p className="font-sf-pro-display text-[16px] font-normal leading-[19.09px] text-left">
              Отображать заказы:
            </p>
            <p className="flex items-center gap-[10px] font-sf-pro-display text-[16px] font-normal leading-[19.09px] text-left">
              <img src={CheckboxG} alt="sign" width={24} height={24} />
              оплаченные
            </p>
            <p className="flex items-center gap-[10px] font-sf-pro-display text-[16px] font-normal leading-[19.09px] text-left">
              <img src={CheckboxR} alt="sign" width={24} height={24} />
              не оплаченные
            </p>
            <Button
              type="primary"
              className="font-sf-pro-display text-[14px] font-medium leading-[16.71px] text-left py-[10px] ml-2"
              onClick={() => navigate("create-order")}
            >
              <img src={AddCircle} alt="add icon" width={20} height={20} />
              Создать заказ
            </Button>
          </div>
        </div>
      </div>
      <div className="py-6 pt-10 flex justify-center gap-6 bg-white">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="newOrders">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-[#F5F5F5] w-[448px] min-h-[600px] rounded-tr-[8px] relative"
              >
                <p className="rounded-tr-[8px] absolute top-[-29px] left-0 bg-[#F5F5F5] px-3 py-1 text-medium">
                  Новые ({newOrders.length})
                </p>
                {newOrders.length ? (
                  newOrders.map((order, index) => (
                    <Draggable
                      key={order.id}
                      draggableId={order.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <OrderCard
                          order={order}
                          provided={provided}
                          isDragging={snapshot.isDragging}
                        />
                      )}
                    </Draggable>
                  ))
                ) : (
                  <div className="flex items-center justify-center mt-[200px]">
                    <NoOrders />
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="inProcessOrders">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-[#F5F5F5] w-[448px] rounded-tr-[8px] relative"
              >
                <p className="rounded-tr-[8px] absolute top-[-29px] left-0 bg-[#F5F5F5] px-3 py-1 text-medium">
                  В процессе ({inProcessOrders.length})
                </p>
                {inProcessOrders.length ? (
                  inProcessOrders.map((order, index) => (
                    <Draggable
                      key={order.id}
                      draggableId={order.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <OrderCard
                          order={order}
                          provided={provided}
                          isDragging={snapshot.isDragging}
                        />
                      )}
                    </Draggable>
                  ))
                ) : (
                  <div className="flex items-center justify-center mt-[200px]">
                    <NoOrders />
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="finishedOrders">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-[#F5F5F5] w-[448px] rounded-tr-[8px] relative"
              >
                <p className="rounded-tr-[8px] absolute top-[-29px] left-0 bg-[#F5F5F5] px-3 py-1 text-medium">
                  Готовые  ({finishedOrders.length})
                </p>
                {finishedOrders.length ? (
                  finishedOrders.map((order, index) => (
                    <Draggable
                      key={order.id}
                      draggableId={order.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <OrderCard
                          order={order}
                          provided={provided}
                          isDragging={snapshot.isDragging}
                        />
                      )}
                    </Draggable>
                  ))
                ) : (
                  <div className="flex items-center justify-center mt-[200px]">
                    <NoOrders />
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Orders;
