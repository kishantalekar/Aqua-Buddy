import { WEIGHT_SCREEN } from "../../../constants/screen";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ScrollWheel from "../../../components/ScrollWheel";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ACTIVITY_SCREEN, GENDER_SCREEN } from "../../../constants/screen";
import { useNavigation } from "@react-navigation/native";
import { getItem, setItem } from "../../../storage/database";
import { ACTIVITY_KEY, AUTH_KEY } from "../../../constants/storage";
const ActivityScreen = ({ onPrevPage }) => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const navigation = useNavigation();

  const data = [10, 20, 30, 40, 50, 60, 90, 120, 160, 200, 240];
  const handleNavigate = async () => {
    await setItem(ACTIVITY_KEY, data[selectedIndex]);

    navigation.navigate("settings", { activity: data[selectedIndex] });
  };

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
        onPress={() => onPrevPage(WEIGHT_SCREEN)}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.weightContainer}>
        <Text style={styles.weightText}>
          How much time do you train per day?
        </Text>
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
          <Text style={styles.scrollText}>min</Text>
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
        onPress={handleNavigate}
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
    paddingTop: 80,
  },
  weightText: {
    fontWeight: "bold",
    fontSize: 28,
    // backgroundColor: "red",
    textAlign: "center",
  },
  wheel: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // padding: 20,
  },
  icon: {
    paddingTop: 10,
    paddingRight: 10,
    marginTop: 50,
  },
  scrollText: {
    color: "#189afd",
    fontSize: 40,
    marginLeft: 10,
    borderTopColor: "#d8d8d8",
    borderBottomColor: "#d8d8d8",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 56,
    paddingBottom: 20,
    textAlign: "center",
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
export default ActivityScreen;
