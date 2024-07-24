import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const statusSvg: React.FC = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.09496 12.9102C10.3132 7.21566 11.9223 4.36836 14.1304 3.63542C15.3451 3.2322 16.6536 3.2322 17.8683 3.63542C20.0764 4.36836 21.6855 7.21566 24.9037 12.9102C28.122 18.6048 29.7311 21.4521 29.2484 23.7721C28.9828 25.0485 28.3286 26.2062 27.3794 27.0793C25.6541 28.6663 22.4358 28.6663 15.9993 28.6663C9.56288 28.6663 6.34464 28.6663 4.6193 27.0793C3.67012 26.2062 3.01587 25.0485 2.75031 23.7721C2.26761 21.4521 3.87673 18.6048 7.09496 12.9102Z"
      stroke="#5566FF"
      stroke-width="2"
    />
    <path
      d="M15.988 21.333H16"
      stroke="#5566FF"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16 17.333L16 11.9997"
      stroke="#5566FF"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default function NotFoundIcon(
  props: Partial<CustomIconComponentProps>
): React.ReactElement {
  return <Icon component={statusSvg} {...props} />;
}
