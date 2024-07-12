import { CustomRoute } from "../types";
interface Props {
  children: React.ReactElement;
  sidebarRoutes: CustomRoute[];
}

export default function DefaultLayout(props: Props): React.ReactElement {
  const { children, sidebarRoutes } = props;

  const { defaultLanguage, handleLanguageChange } =
    useDefaultLayoutState(sidebarRoutes);


  return (
    <div className="">
      Layout
      {children}
    </div>
  );
}
