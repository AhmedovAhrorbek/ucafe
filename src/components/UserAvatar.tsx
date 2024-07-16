import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const UserAvatarSvg: React.FC = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_4410_42)">
      <rect width="36" height="36" rx="18" fill="#5ACEC7" />
      <g filter="url(#filter0_ii_4410_42)">
        <rect
          x="5.92188"
          y="5.9043"
          width="24.1655"
          height="44.0041"
          rx="12.0827"
          fill="#F3F3F3"
        />
        <rect
          x="5.92188"
          y="5.9043"
          width="24.1655"
          height="44.0041"
          rx="12.0827"
          fill="url(#paint0_linear_4410_42)"
        />
      </g>
      <circle cx="14.126" cy="14.8896" r="1.63768" fill="#2F3138" />
      <circle cx="22.1279" cy="14.8896" r="1.63768" fill="#2F3138" />
      <path
        d="M12.7305 20.8281C13.6659 26.9028 22.4637 26.7858 23.3064 20.8281"
        stroke="#2F3138"
        strokeWidth="0.872522"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_ii_4410_42"
        x="4.87485"
        y="5.9043"
        width="26.2601"
        height="45.0509"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="1.04703" dy="1.04703" />
        <feGaussianBlur stdDeviation="8.72522" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_4410_42"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-1.04703" />
        <feGaussianBlur stdDeviation="1.74504" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_innerShadow_4410_42"
          result="effect2_innerShadow_4410_42"
        />
      </filter>
      <linearGradient
        id="paint0_linear_4410_42"
        x1="18.0046"
        y1="5.9043"
        x2="18.0046"
        y2="49.9084"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFEBB8" />
        <stop offset="1" stopColor="#FFC839" />
      </linearGradient>
      <clipPath id="clip0_4410_42">
        <rect width="36" height="36" rx="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const UserAvatarIcon: React.FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={UserAvatarSvg} {...props} />;
};

export default UserAvatarIcon;
