import NoHistoryIcon from "./NoHistoryIcon"

const NoOrdersHistory:React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[328px]">
      <NoHistoryIcon />
      <p className="text-center">На данный момент у Вас нет ни одного завершенного заказа</p>
    </div>
  );
}

export default NoOrdersHistory
