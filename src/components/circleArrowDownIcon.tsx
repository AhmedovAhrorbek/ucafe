import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const downSvg: React.FC = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12.4004" cy="12.5" r="10" fill="#FF1F00" fill-opacity="0.15" />
    <path
      d="M12.4004 8.5V16.5M12.4004 16.5L14.9004 14M12.4004 16.5L9.90039 14"
      stroke="#FF1F00"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default function CircleArrowDownIcon(
  props: Partial<CustomIconComponentProps>
): React.ReactElement {
  return <Icon component={downSvg} {...props} />;
}
