import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const buildingSvg: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.3327 18.333L1.66602 18.333"
      stroke="#5566FF"
      stroke-linecap="round"
    />
    <path
      d="M17.4996 18.3337L17.4996 5.00033C17.4996 3.42898 17.4996 2.6433 17.0115 2.15515C16.5233 1.66699 15.7376 1.66699 14.1663 1.66699L12.4996 1.66699C10.9283 1.66699 10.1426 1.66699 9.65446 2.15515C9.2615 2.5481 9.18487 3.13384 9.16992 4.16699"
      stroke="#5566FF"
    />
    <path
      d="M12.5 18.3337L12.5 7.50033C12.5 5.92898 12.5 5.1433 12.0118 4.65515C11.5237 4.16699 10.738 4.16699 9.16667 4.16699L5.83333 4.16699C4.26198 4.16699 3.47631 4.16699 2.98816 4.65515C2.5 5.1433 2.5 5.92898 2.5 7.50033L2.5 18.3337"
      stroke="#5566FF"
    />
    <path d="M7.5 18.333L7.5 15.833" stroke="#5566FF" stroke-linecap="round" />
    <path d="M5 6.66699L10 6.66699" stroke="#5566FF" stroke-linecap="round" />
    <path d="M5 9.16699L10 9.16699" stroke="#5566FF" stroke-linecap="round" />
    <path d="M5 11.667L10 11.667" stroke="#5566FF" stroke-linecap="round" />
  </svg>
);

export default function BuildingIcon(
  props: Partial<CustomIconComponentProps>
): React.ReactElement {
  return <Icon component={buildingSvg} {...props} />;
}
