import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const expensesSvg: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12Z"
      stroke="#5566FF"
      stroke-width="1.5"
    />
    <path
      d="M19 11.142C18.6749 11.0949 18.341 11.0591 18 11.0352M6 12.9658C5.65897 12.942 5.32511 12.9061 5 12.859"
      stroke="#5566FF"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 19.5C10.6675 20.1224 8.91707 20.5 7 20.5C5.93408 20.5 4.91969 20.3833 4 20.1726C2.49957 19.8289 2 18.9264 2 17.386V6.61397C2 5.62914 3.04003 4.95273 4 5.1726C4.91969 5.38325 5.93408 5.5 7 5.5C8.91707 5.5 10.6675 5.12236 12 4.5C13.3325 3.87764 15.0829 3.5 17 3.5C18.0659 3.5 19.0803 3.61675 20 3.8274C21.5817 4.18968 22 5.12036 22 6.61397V17.386C22 18.3709 20.96 19.0473 20 18.8274C19.0803 18.6167 18.0659 18.5 17 18.5C15.0829 18.5 13.3325 18.8776 12 19.5Z"
      stroke="#5566FF"
      stroke-width="1.5"
    />
  </svg>
);

export default function ExpensesIcon(
  props: Partial<CustomIconComponentProps>
): React.ReactElement {
  return <Icon component={expensesSvg} {...props} />;
}