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

const Orders = () => {
  const [newOrders, setNewOrders] = useState<Order[]>([]);
  const [inProcessOrders, setInProcessOrders] = useState<Order[]>([]);
  const [finishedOrders, setFinishedOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  const { data: newOrdersData } = useQuery({
    queryKey: ["orders", "new"],
    queryFn: async () => {
      const res = await getOrders({ status: "new", page_size: 100 });
      return res.results; // Ensure only results are returned
    },
  });

  const { data: inProcessOrdersData } = useQuery({
    queryKey: ["orders", "processing"],
    queryFn: async () => {
      const res = await getOrders({ status: "processing", page_size: 100 });
      return res.results; // Ensure only results are returned
    },
  });

  const { data: finishedOrdersData } = useQuery({
    queryKey: ["orders", "completed"],
    queryFn: async () => {
      const res = await getOrders({ status: "completed", page_size: 100 });
      return res.results; // Ensure only results are returned
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

    const sourceClone = Array.from(
      source.droppableId === "newOrders"
        ? newOrders
        : source.droppableId === "inProcessOrders"
        ? inProcessOrders
        : finishedOrders
    );

    const destClone = Array.from(
      destination.droppableId === "newOrders"
        ? newOrders
        : destination.droppableId === "inProcessOrders"
        ? inProcessOrders
        : finishedOrders
    );

    const [removed] = sourceClone.splice(source.index, 1);
    destClone.splice(destination.index, 0, removed);

    if (source.droppableId === "newOrders") {
      setNewOrders(sourceClone);
    } else if (source.droppableId === "inProcessOrders") {
      setInProcessOrders(sourceClone);
    } else {
      setFinishedOrders(sourceClone);
    }

    if (destination.droppableId === "newOrders") {
      setNewOrders(destClone);
    } else if (destination.droppableId === "inProcessOrders") {
      setInProcessOrders(destClone);
    } else {
      setFinishedOrders(destClone);
    }
  };

  return (
    <div>
      <div className="bg-white px-[24px] py-[15px] border-b border-gray-200 pb-5">
        <div className="flex items-center justify-between ">
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
                className="bg-[#F5F5F5] w-[448px] rounded-tr-[8px] relative"
              >
                <p className="rounded-tr-[8px] absolute top-[-29px] left-0 bg-[#F5F5F5] px-3 py-1 text-medium">
                  Новые ({newOrders.length})
                </p>
                {newOrders ? (
                  newOrders.map((order, index) => (
                    <Draggable
                      key={order.id}
                      draggableId={order.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <OrderCard order={order} provided={provided} />
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
                className="bg-[#F5F5F5] w-[448px] h-[712px] rounded-tr-[8px] relative"
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
                        <OrderCard order={order} provided={provided} />
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
                  Готовые ({finishedOrders.length})
                </p>
                {finishedOrders.length ? (
                  finishedOrders.map((order, index) => (
                    <Draggable
                      key={order.id}
                      draggableId={order.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <OrderCard order={order} provided={provided} />
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
