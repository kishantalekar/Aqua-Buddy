import React from "react";
import { View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const CircularProgressBar = ({
  percentage,
  radius,
  strokeWidth,
  color,
  children,
}) => {
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <View style={{ zIndex: 10 }}>
      <Svg width={radius * 2} height={radius * 2}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={"#c9e4f7"} />
            <Stop offset="1" stopColor="#c9e4f7" stopOpacity="0.5" />
          </LinearGradient>
        </Defs>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth}
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />
        {/* Render children components */}
        <View>{children}</View>
      </Svg>
    </View>
  );
};

export default CircularProgressBar;
