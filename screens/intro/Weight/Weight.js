import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ScrollWheel from "../../../components/ScrollWheel";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ACTIVITY_SCREEN, GENDER_SCREEN } from "../../../constants/screen";
import Activity from "../Activity/Activity";
import { setItem } from "../../../storage/database";
import { WEIGHT_KEY } from "../../../constants/storage";
const Weight = ({ onPrevPage, onNextPage }) => {
  const [selectedIndex, setSelectedIndex] = useState(19);
  let data = [
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
    79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
  ];
  const renderItem = (data, index) => {
    return (
      <View key={index}>
        <Text
          style={{
            color: selectedIndex == index ? "#189afd" : "gray",
            fontWeight: "400",
            fontSize: 40,
          }}
        >
          {data}
        </Text>
      </View>
    );
  };
  const onValueChange = (data, selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };
  const nextPageHandler = async () => {
    await setItem(WEIGHT_KEY, data[selectedIndex]);

    onNextPage(ACTIVITY_SCREEN);
  };
  return (
    <>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 50,
          left: 20,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 10,
          padding: 4,
        }}
        onPress={() => onPrevPage(GENDER_SCREEN)}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.weightContainer}>
        <Text style={styles.weightText}>what is your current Weight?</Text>
        <View style={styles.wheel}>
          <AntDesign
            name="caretright"
            size={35}
            color="#189afd"
            style={styles.icon}
          />
          <View style={styles.scrollContainer}>
            <ScrollWheel
              renderItem={renderItem}
              onValueChange={onValueChange}
              selectedIndex={selectedIndex}
              data={data}
            />
          </View>
          <Text style={styles.scrollText}>kg</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#1a9aff",
          padding: 15,
          borderRadius: 30,
          marginRight: 20,
          marginBottom: 20,
        }}
        onPress={nextPageHandler}
      >
        <MaterialIcons name="navigate-next" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  weightContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  weightText: {
    fontWeight: "bold",
    fontSize: 24,
    // backgroundColor: "red",
    textAlign: "center",
  },
  wheel: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // padding: 20,
    marginTop: 40,
  },
  icon: {
    paddingTop: 4,
    paddingRight: 10,
    marginTop: 50,
  },
  scrollText: {
    color: "#189afd",
    fontSize: 30,
    marginLeft: 10,
    borderTopColor: "#d8d8d8",
    borderBottomColor: "#d8d8d8",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: 40,
    height: 78,
    marginTop: 56,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 18,
  },
  scrollContainer: {
    width: 60,
    height: 220,
    marginTop: 30,
    fontSize: 20,
  },
});
export default Weight;
