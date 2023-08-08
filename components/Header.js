import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../main";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { getItem } from "../storage/database";
import { GENDER_KEY } from "../constants/storage";
import { useState } from "react";

const Header = () => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("settings");
  };
  const [gender, setGender] = useState("");
  useEffect(() => {
    const getData = async () => {
      const data = JSON.parse(await getItem(GENDER_KEY)) || "male";

      setGender(data);
    };
    getData();
  }, []);
  // console.log(gender);
  return (
    <View style={styles.header}>
      {gender === "male" ? (
        <Image source={require("../assets/male.jpg")} style={styles.image} />
      ) : (
        <Image source={require("../assets/female.jpeg")} style={styles.image} />
      )}

      <Text style={styles.headerText}>Aqua Buddy</Text>
      <TouchableOpacity onPress={handleNavigate}>
        <Ionicons name="settings-outline" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
