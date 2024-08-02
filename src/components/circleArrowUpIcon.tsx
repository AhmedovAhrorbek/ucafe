import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const upSvg: React.FC = () => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12.5" r="10" fill="#2BC128" fill-opacity="0.15" />
    <path
      d="M14.5 11L12 8.5M12 8.5L9.5 11M12 8.5V16.5"
      stroke="#2BC128"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default function CircleArrowUpIcon(
  props: Partial<CustomIconComponentProps>
): React.ReactElement {
  return <Icon component={upSvg} {...props} />;
}
