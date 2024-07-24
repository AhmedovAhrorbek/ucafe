import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const chairSvg: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.83398 12.5V18.3333M14.1673 12.5V18.3333"
      stroke="#5566FF"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10 9.16602C8.73188 9.16602 7.39109 9.40974 6.34002 9.73582C5.54859 9.98136 4.91195 11.101 5.00999 12.01C5.04632 12.3468 5.30731 12.4993 5.58173 12.4993H14.4183C14.6927 12.4993 14.9537 12.3468 14.99 12.01C15.0881 11.101 14.4514 9.98136 13.66 9.73582C12.6089 9.40974 11.2681 9.16602 10 9.16602Z"
      stroke="#5566FF"
      stroke-linecap="round"
    />
    <path
      d="M5.90238 9.99935L5.59765 6.90552C5.38531 4.74966 5.27914 3.67174 5.73845 2.89884C6.60289 1.44421 8.53313 1.68018 9.99935 1.68018C11.4656 1.68018 13.3958 1.44421 14.2603 2.89884C14.7196 3.67174 14.6134 4.74966 14.401 6.90552L14.0963 9.99935"
      stroke="#5566FF"
      stroke-linejoin="round"
    />
    <path
      d="M5.83398 15L14.1673 15"
      stroke="#5566FF"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default function ChairIcon(
  props: Partial<CustomIconComponentProps>
): React.ReactElement {
  return <Icon component={chairSvg} {...props} />;
}
