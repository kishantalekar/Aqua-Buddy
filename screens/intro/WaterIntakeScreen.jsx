import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { setItem } from "../../storage/database";
import { WATER_IN_TAKE_GOAL } from "../../constants/storage";
import { useNavigation } from "@react-navigation/native";
const WaterIntakeScreen = ({ route }) => {
  const [waterIntake, setWaterInTake] = useState(`${route.params.waterInTake}`);
  const navigation = useNavigation();
  const handleSave = async () => {
    await setItem(WATER_IN_TAKE_GOAL, waterIntake);
    navigation.navigate("settings", { waterIntake: waterIntake });
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: "50%",
        backgroundColor: "white",
        paddingHorizontal: 40,
      }}
    >
      <Text
        style={{
          fontWeight: 500,
          fontSize: 24,
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        Set Your water intake goal
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          // placeholder="enter your water intake goal"
          value={waterIntake}
          keyboardType="numeric"
          onChangeText={(e) => setWaterInTake(e)}
          style={{
            borderWidth: 0.8,
            borderColor: "gray",
            borderRadius: 12,
            marginTop: 20,
            flex: 1,
            paddingVertical: 5,
            paddingHorizontal: 10,
            color: "#1a9aff",
          }}
          defaultValue={`${waterIntake}`}
        />
        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            marginLeft: -30,
            marginTop: 10,
            color: "gray",
          }}
        >
          ml
        </Text>
      </View>
      <TouchableOpacity
        style={{
          alignItems: "center",
          marginTop: 20,

          borderRadius: 10,
          padding: 10,
          backgroundColor: "#1a9aff",
        }}
        onPress={handleSave}
      >
        <Text style={{ color: "white" }}>Save</Text>
      </TouchableOpacity>

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
        onPress={handleSave}
      >
        <MaterialIcons name="navigate-next" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default WaterIntakeScreen;
