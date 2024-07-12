// import "@/utils/i18n";

interface Props {
  children: React.ReactElement;
}

export default function LangProvider(props: Props): React.ReactElement {
  const { children } = props;

  return children;
}
