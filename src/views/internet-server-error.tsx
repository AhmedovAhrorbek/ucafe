import { Button } from "antd";

export default function InternalServerError(): React.ReactElement {

  return (
    <div
      className="bg-white flex items-center justify-center"
      style={{ height: "calc(100vh - 64px - 64px)" }}
    >
      <div className="w-1/4 text-center flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-4 items-center justify-center">
          <span>500 info</span>
        </div>

        <Button
          type="primary"
          onClick={() => {
            window.location.reload();
          }}
        >
          refresh
        </Button>
      </div>
    </div>
  );
}
