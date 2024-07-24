import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import NotFoundIcon from "../components/NotFoundIcon";

export default function NotFound(): React.ReactElement {

  const navigate = useNavigate();

  return (
    <div
      className="bg-white flex items-center justify-center"
      style={{ height: "calc(100vh - 64px - 64px)" }}
    >
      <div className="w-1/4 text-center flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-4 items-center justify-center">
          <div>
            <NotFoundIcon />
          </div>
          <span>
            Страница, которую вы запрашиваете не существует. Возможно, она
            устарела, была удалена или был введен неверный адрес
          </span>
        </div>

        <Button
          type="primary"
          onClick={() => {
            navigate("/orders");
          }}
        >
          Обновить
        </Button>
      </div>
    </div>
  );
}
