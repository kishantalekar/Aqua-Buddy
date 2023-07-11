import { View, Text } from "react-native";
import React, { useMemo } from "react";
import ScrollPicker from "react-native-wheel-scrollview-picker";

const ScrollWheel = ({ renderItem, onValueChange, selectedIndex, data }) => {
  return (
    <ScrollPicker
      dataSource={data}
      selectedIndex={selectedIndex}
      renderItem={renderItem}
      onValueChange={onValueChange}
      wrapperHeight={245}
      wrapperWidth={60}
      wrapperColor="#FFFFFF"
      // wrapperColor="red"
      itemHeight={80}
      highlightColor="#d8d8d8"
      highlightBorderWidth={2}
    />
  );
};

export default ScrollWheel;
