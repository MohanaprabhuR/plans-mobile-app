import { Image, ImageStyle, StyleProp } from "react-native";

const leftArrow = require("@/assets/images/left-arrow.png");

const ASPECT_RATIO = 14 / 8;

type Props = {
  size?: number;
  color?: string;
};

export default function LeftArrowIcon({ size = 12, color = "#383838" }: Props) {
  const style: StyleProp<ImageStyle> = {
    width: size,
    height: size * ASPECT_RATIO,
    tintColor: color,
  };

  return <Image source={leftArrow} style={style} resizeMode="contain" />;
}
