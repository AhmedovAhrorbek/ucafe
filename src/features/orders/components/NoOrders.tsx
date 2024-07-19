import noOrderIcon from '../assets/note.png'
const NoOrders:React.FC = () => {
  return (
    <div className=' flex flex-col items-center justify-center'>
      <img src={noOrderIcon} alt="no orders yet" width={32} height={32} />
      <p>Заказов еще нет</p>
    </div>
  );
}

export default NoOrders
