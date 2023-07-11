import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const RecordsTable = ({ records, handleRecord }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  //   console.log("\n\n\n", records);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 10,
      }}
    >
      <RecordButton
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        text={" Today's record"}
        index={0}
        handleRecord={handleRecord}
      />

      <View
        style={{ borderStartWidth: 0.8, borderColor: "gray", height: 30 }}
      ></View>

      <RecordButton
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        text={"Last 7 day's"}
        index={1}
        handleRecord={handleRecord}
      />
      <View
        style={{ borderStartWidth: 0.8, borderColor: "gray", height: 30 }}
      ></View>

      <RecordButton
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        text={" Last 30 day's"}
        index={2}
        handleRecord={handleRecord}
      />
    </View>
  );
};
const RecordButton = ({
  selectedIndex,
  setSelectedIndex,
  text,
  index,
  handleRecord,
}) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: selectedIndex === index ? "#5bacfe" : "white",
        borderRadius: 10,
      }}
      onPress={() => {
        setSelectedIndex(index);
        handleRecord(index);
      }}
    >
      <Text style={{ color: selectedIndex === index ? "white" : "black" }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default RecordsTable;
