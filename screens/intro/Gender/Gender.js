import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { WEIGHT_SCREEN } from "../../../constants/screen";
import { getItem, setItem } from "../../../storage/database";
import { GENDER_KEY } from "../../../constants/storage";
const Gender = ({ onNextPage }) => {
  const [maleSelected, setMaleSelected] = useState(false);
  const [femaleSelected, setFemaleSelected] = useState(false);

  const handleMaleSelected = async () => {
    setMaleSelected(true);
    setFemaleSelected(false);
    await setItem(GENDER_KEY, "male");
  };
  const handleFemaleSelected = async () => {
    setMaleSelected(false);
    setFemaleSelected(true);
    await setItem(GENDER_KEY, "female");
  };

  const handleNext = () => {
    if (maleSelected || femaleSelected) {
      onNextPage(WEIGHT_SCREEN);
    } else {
      alert("Please select your gender");
    }
  };
  return (
    <>
      <View style={styles.genderContainer}>
        <Text style={styles.genderText}>What is your gender?</Text>
        <View style={styles.profileContainer}>
          <View style={styles.profile}>
            <Text
              style={[
                styles.maleText,
                { color: maleSelected == true ? "#1599fb" : "gray" },
              ]}
            >
              Male
            </Text>
            <TouchableOpacity onPress={handleMaleSelected}>
              <Image
                source={require("../../../assets/male.jpg")}
                style={[
                  styles.genderImage,
                  {
                    borderColor: maleSelected == true ? "#1599fb" : "white",
                    borderWidth: maleSelected == true ? 2 : 0,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.profile}>
            <Text
              style={[
                styles.femaleText,
                {
                  color: femaleSelected == true ? "#1599fb" : "gray",
                },
              ]}
            >
              Female
            </Text>
            <TouchableOpacity onPress={handleFemaleSelected}>
              <Image
                source={require("../../../assets/female.jpeg")}
                style={[
                  styles.genderImage,
                  {
                    borderColor: femaleSelected == true ? "#1599fb" : "white",
                    borderWidth: femaleSelected == true ? 2 : 0,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <MaterialIcons name="navigate-next" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  genderContainer: {
    marginTop: 20,
    alignItems: "center",
    // backgroundColor: "red",
    flex: 1,
  },
  genderText: {
    fontSize: 30,
    fontWeight: "700",
    paddingVertical: 20,
  },
  profileContainer: {
    flexDirection: "row",
  },
  profile: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    gap: 10,
  },
  maleText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    fontWeight: "400",
  },
  femaleText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    fontWeight: "400",
  },
  genderImage: {
    height: 120,
    width: 120,
    borderRadius: 20,
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1a9aff",
    padding: 15,
    borderRadius: 30,
    marginRight: 20,
    marginBottom: 20,
  },
});
export default Gender;
