import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";

const RecordsTable = ({ records, handleRecord }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  //   console.log("\n\n\n", records);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ gap: 10 }}
      contentContainerStyle={{ gap: 5 }}
      // style={{
      //   flexDirection: "row",
      //   justifyContent: "space-evenly",
      //   marginTop: 10,
      // }}
    >
      <RecordButton
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        text={" Today's record"}
        index={0}
        handleRecord={handleRecord}
      />

      <RecordButton
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        text={"Last 7 day's"}
        index={1}
        handleRecord={handleRecord}
      />

      <RecordButton
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        text={" Last 30 day's"}
        index={2}
        handleRecord={handleRecord}
      />
    </ScrollView>
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
