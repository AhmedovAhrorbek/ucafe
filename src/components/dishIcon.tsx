import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const dishSvg: React.FC = () => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.38086 14.167H19.0475" stroke="#5566FF" stroke-linecap="round" />
    <path
      d="M10.7148 5.83333C10.7148 5.83333 11.9648 4.97199 11.9648 3.90946C11.9648 2.03018 9.46484 2.03018 9.46484 3.90946C9.46484 4.97199 10.7148 5.83333 10.7148 5.83333Z"
      stroke="#5566FF"
      stroke-linejoin="round"
    />
    <path
      d="M3.21484 14.167L3.73257 16.2379C3.91805 16.9798 4.58469 17.5003 5.34947 17.5003H16.0802C16.845 17.5003 17.5116 16.9798 17.6971 16.2379L18.2148 14.167"
      stroke="#5566FF"
      stroke-linecap="round"
    />
    <path
      d="M17.7975 12.083C17.3822 8.5637 14.3693 5.83301 10.7142 5.83301C7.05908 5.83301 4.04614 8.5637 3.63086 12.083"
      stroke="#5566FF"
      stroke-linecap="round"
    />
  </svg>
);

export default function DishIcon(
  props: Partial<CustomIconComponentProps>
): React.ReactElement {
  return <Icon component={dishSvg} {...props} />;
}
