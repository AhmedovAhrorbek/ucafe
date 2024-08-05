import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const tickSvg: React.FC = () => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.28703 10.0939C7.28703 10.0939 7.28704 10.0939 7.28704 10.0939L7.28703 10.0939ZM7.26483 10.1161L7.26485 10.1161L7.26483 10.1161ZM13.7118 7.80532L13.7117 7.80543C13.7117 7.80539 13.7118 7.80536 13.7118 7.80532Z"
      fill="#2F3138"
      stroke="white"
      stroke-width="1.33333"
    />
  </svg>
);

export default function TickIcon(
  props: Partial<CustomIconComponentProps>
): React.ReactElement {
  return <Icon component={tickSvg} {...props} />;
}
