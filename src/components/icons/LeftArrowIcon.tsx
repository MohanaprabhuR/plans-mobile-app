import Svg, { Path } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export default function LeftArrowIcon({
  size = 12,
  color = "#383838",
}: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path
        d="M8 2L3 6L8 10"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
