import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AddWater from "./AddWater";

const ProgressData = ({ dailyGoal, progress, percentage, handleProgress }) => {
  const handleClick = () => {
    handleProgress();
  };

  return (
    <View style={styles.progressContainer}>
      <Text style={{ color: "gray", fontWeight: "500", fontSize: 12 }}>
        200 ml
      </Text>
      <Text
        style={{
          color: "#5bacfe",
          fontSize: 24,
          borderBottomWidth: 0.5,
          borderColor: "gray",
          fontWeight: "bold",
        }}
      >
        {progress}
        <Text style={{ color: "black", fontSize: 24 }}>
          /{dailyGoal || 0} ml
        </Text>
      </Text>
      <Text
        style={{ color: "gray", fontWeight: "500", marginTop: 8, fontSize: 12 }}
      >
        You have completed {percentage.toString() || 1}% of
      </Text>
      <Text style={{ color: "gray", fontWeight: "500", fontSize: 12 }}>
        your daily drink target
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    backgroundColor: "gray",
    height: 30,
    width: 30,
    borderRadius: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#1a9aff",
  },
  progressContainer: {
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "red",
    marginTop: 50,
    paddingTop: 40,
    zIndex: 10,
  },
  addButton: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
export default ProgressData;
