import { Button } from "antd";
import CheckboxG from "../../assets/Checkbox-green.png";
import CheckboxR from "../../assets/Checkbox-red.png";
import AddCircle from "../../assets/add-circle.png";
import { useNavigate } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../../api"; // Importing updateOrderStatus function
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Order } from "../../types";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { message } from "antd";
import OrderCard from "../../components/OrderCard";
import NoOrders from "../../components/NoOrders";

const Orders = () => {
  const [newOrders, setNewOrders] = useState<Order[]>([]);
  const [inProcessOrders, setInProcessOrders] = useState<Order[]>([]);
  const [finishedOrders, setFinishedOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  const { data: newOrdersData } = useQuery({
    queryKey: ["orders", "new"],
    queryFn: async () => {
      const res = await getOrders({ status: "new" });
      return res.results;
    },
  });

  const { data: inProcessOrdersData } = useQuery({
    queryKey: ["orders", "processing"],
    queryFn: async () => {
      const res = await getOrders({ status: "processing" });
      return res.results;
    },
  });

  const { data: finishedOrdersData } = useQuery({
    queryKey: ["orders", "completed"],
    queryFn: async () => {
      const res = await getOrders({ status: "completed" });
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

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceId = source.droppableId;
    const destId = destination.droppableId;

    // Updating the order status
    const movedOrder =
      sourceId === "droppable"
        ? newOrders[source.index]
        : sourceId === "droppable2"
        ? inProcessOrders[source.index]
        : finishedOrders[source.index];

    const updatedOrder = { ...movedOrder };

     if (
       sourceId === "droppable3" &&
       (destId === "droppable" || destId === "droppable2")
     ) {
       message.error(
         "Завершенный заказ нельзя переместить в новые или в процессе."
       );
       return;
     }
     
    if (destId === "droppable") {
      updatedOrder.status = "new";
    } else if (destId === "droppable2") {
      updatedOrder.status = "processing";
    } else if (destId === "droppable3") {
      updatedOrder.status = "completed";
    }

    
    // Updating the order lists
    const newOrderList = [...newOrders];
    const inProcessOrderList = [...inProcessOrders];
    const finishedOrderList = [...finishedOrders];
    
   
    
    if (sourceId === "droppable") newOrderList.splice(source.index, 1);
    else if (sourceId === "droppable2")
      inProcessOrderList.splice(source.index, 1);
    else if (sourceId === "droppable3")
      finishedOrderList.splice(source.index, 1);
    
    if (destId === "droppable")
      newOrderList.splice(destination.index, 0, movedOrder);
    else if (destId === "droppable2")
      inProcessOrderList.splice(destination.index, 0, movedOrder);
    else if (destId === "droppable3")
      finishedOrderList.splice(destination.index, 0, movedOrder);
    
    setNewOrders(newOrderList);
    setInProcessOrders(inProcessOrderList);
    setFinishedOrders(finishedOrderList);

    await updateOrderStatus(updatedOrder.id, updatedOrder.status);
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
      <div className="flex flex-col relative">
        <div className="py-6 pt-10 flex justify-center gap-6 bg-white">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className="bg-[#F5F5F5] w-[470px] min-h-[600px] rounded-tr-[8px] relative"
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
                        {(provided) => (
                          <OrderCard
                            ref={provided.innerRef}
                            provided={provided}
                            order={order}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onOrderClick={order.id}
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

            <Droppable droppableId="droppable2">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className="bg-[#F5F5F5] w-[470px] rounded-tr-[8px] relative"
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
                        {(provided) => (
                          <OrderCard
                            ref={provided.innerRef}
                            provided={provided}
                            order={order}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onOrderClick={order.id}
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

            <Droppable droppableId="droppable3">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className="bg-[#F5F5F5] w-[470px] rounded-tr-[8px] relative"
                >
                  <p className="rounded-tr-[8px] absolute top-[-29px] left-0 bg-[#F5F5F5] px-3 py-1 text-medium">
                    Выполненные ({finishedOrders.length})
                  </p>
                  {finishedOrders.length ? (
                    finishedOrders.map((order, index) => (
                      <Draggable
                        key={order.id}
                        draggableId={order.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <OrderCard
                            ref={provided.innerRef}
                            provided={provided}
                            order={order}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onOrderClick={order.id}
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
    </div>
  );
};

export default Orders;
