import { View } from "react-native";
import Svg, { Path, Text as SvgText } from "react-native-svg";

export default function RiskGauge() {
  return (
    <View style={{ alignItems: "center", marginVertical: 16 }}>
      <Svg width={160} height={90} viewBox="0 0 160 90">
        {/* Track */}
        <Path
          d="M15,80 A65,65 0 0,1 145,80"
          fill="none"
          stroke="#F0EDE8"
          strokeWidth={14}
          strokeLinecap="round"
        />
        {/* Orange left */}
        <Path
          d="M15,80 A65,65 0 0,1 80,15"
          fill="none"
          stroke="#E8863C"
          strokeWidth={14}
          strokeLinecap="round"
        />
        {/* Green right */}
        <Path
          d="M80,15 A65,65 0 0,1 145,80"
          fill="none"
          stroke="#4ADE80"
          strokeWidth={14}
          strokeLinecap="round"
        />
        <SvgText
          x="80"
          y="72"
          textAnchor="middle"
          fontSize={13}
          fontWeight="600"
          fill="#111"
        >
          Your Risks
        </SvgText>
      </Svg>
    </View>
  );
}
