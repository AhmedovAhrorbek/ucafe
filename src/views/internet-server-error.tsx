import { Button } from "antd";
import NotFoundIcon from "../components/NotFoundIcon";

export default function InternalServerError(): React.ReactElement {

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
            Ошибка сервера 500. На сервере произошла непредвиденная ошибка.
            Пожалуйста, подождите, она вскоре будет исправлена.
          </span>
        </div>

        <Button
          type="primary"
          onClick={() => {
            window.location.reload();
          }}
        >
          Обновить
        </Button>
      </div>
    </div>
  );
}
