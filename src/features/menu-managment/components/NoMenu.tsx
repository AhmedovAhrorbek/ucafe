import MenuIcon from '../../../assets/dish-01.png'
const NoMenu:React.FC = () => {
  return (
    <div className=" flex flex-col items-center justify-center mt-[240px]">
      <img src={MenuIcon} alt="menu icon"  />
      <p className="text-center w-[302px] ">
        На данный момент Вы не добавили ни одного блюда в меню
      </p>
    </div>
  );
}

export default NoMenu
