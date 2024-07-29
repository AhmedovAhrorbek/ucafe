import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const updateSvg: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.1216 2.64453C14.611 2.15514 14.8557 1.91045 15.1268 1.79343C15.5173 1.62485 15.9601 1.62485 16.3506 1.79343C16.6217 1.91045 16.8664 2.15514 17.3558 2.64453C17.8452 3.13393 18.0899 3.37862 18.2069 3.6497C18.3755 4.04024 18.3755 4.48303 18.2069 4.87357C18.0899 5.14465 17.8452 5.38934 17.3558 5.87873L13.1711 10.0634C12.1401 11.0944 11.6246 11.6099 10.979 11.9153C10.3334 12.2208 9.60786 12.2923 8.15686 12.4355L7.5 12.5003L7.56481 11.8435C7.70799 10.3925 7.77957 9.66697 8.08501 9.02132C8.39045 8.37568 8.90594 7.86018 9.93694 6.82919L14.1216 2.64453Z"
      stroke="#5566FF"
      stroke-linejoin="round"
    />
    <path
      d="M4.99935 12.5H3.12435C2.31893 12.5 1.66602 13.1529 1.66602 13.9583C1.66602 14.7637 2.31893 15.4167 3.12435 15.4167H11.041C11.8464 15.4167 12.4993 16.0696 12.4993 16.875C12.4993 17.6804 11.8464 18.3333 11.041 18.3333H9.16602"
      stroke="#5566FF"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default function EditIcon(
  props: Partial<CustomIconComponentProps>
): React.ReactElement {
  return <Icon component={updateSvg} {...props} />;
}
