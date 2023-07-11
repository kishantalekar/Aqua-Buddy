import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../main";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("settings");
  };
  return (
    <View style={styles.header}>
      <Image source={require("../assets/drop.png")} style={styles.image} />
      <Text style={styles.headerText}>Aqua Buddy</Text>
      <TouchableOpacity onPress={handleNavigate}>
        <Ionicons name="settings-outline" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
