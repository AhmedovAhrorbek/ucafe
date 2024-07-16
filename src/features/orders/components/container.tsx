import useMatchEither from "../../../hooks/use-match";
import { Outlet } from "react-router-dom";

interface Props {
  of: React.ReactElement;
}

export default function Container(props: Props): React.ReactElement {
  const { of } = props;

  const match = useMatchEither([
    "/orders/create-order",
    "/orders/edit-order/:id",
  ]);

  if (match) {
    return <Outlet />;
  }

  return of;
}
