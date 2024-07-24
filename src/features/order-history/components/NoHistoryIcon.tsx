import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const historySvg: React.FC = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.1732 9.35574L23.5371 11.0513M15.8091 14.4181L18.991 15.2659M15.9673 23.9556L17.2401 24.2947C20.8401 25.2538 22.64 25.7334 24.0581 24.9193C25.4761 24.1053 25.9584 22.3154 26.923 18.7358L28.2872 13.6734C29.2518 10.0937 29.7341 8.3039 28.9154 6.89387C28.0967 5.48384 26.2967 5.00426 22.6967 4.04509L21.424 3.70598C17.824 2.74681 16.024 2.26723 14.606 3.08131C13.188 3.89539 12.7057 5.68522 11.7411 9.26487L10.3769 14.3273C9.4123 17.9069 8.93 19.6968 9.7487 21.1068C10.5674 22.5168 12.3674 22.9964 15.9673 23.9556Z"
      stroke="#5566FF"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M15.9993 27.9281L14.7296 28.2739C11.1381 29.2518 9.3423 29.7408 7.9276 28.9108C6.51291 28.0807 6.03174 26.2558 5.0694 22.6059L3.70844 17.4442C2.7461 13.7943 2.26493 11.9694 3.08171 10.5317C3.78824 9.28809 5.33268 9.33337 7.33268 9.33321"
      stroke="#5566FF"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

export default function NoHistoryIcon(
  props: Partial<CustomIconComponentProps>
): React.ReactElement {
  return <Icon component={historySvg} {...props} />;
}
