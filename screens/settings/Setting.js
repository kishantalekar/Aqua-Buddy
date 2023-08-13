import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { clearStorage, getItem, setItem } from "../../storage/database";
import {
  ACTIVITY_KEY,
  AUTH_KEY,
  GENDER_KEY,
  WATER_IN_TAKE_GOAL,
  WEIGHT_KEY,
} from "../../constants/storage";
import { calcDailyGoal } from "../../utils/Drink";
// import { Restart } from "fiction-expo-restart";
import * as Updates from "expo-updates";

const Setting = ({ handleAuthChange, route }) => {
  //rest object
  const navigation = useNavigation();

  // states
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [activity, setAcitivty] = useState("");
  const [waterInTake, setWaterInTake] = useState("");

  //getting user info from local storage
  useEffect(() => {
    const getUserInfo = async () => {
      const weight = await getItem(WEIGHT_KEY);
      const gender = JSON.parse(await getItem(GENDER_KEY)) || "Male";
      const activity = await getItem(ACTIVITY_KEY);

      setWaterInTake(
        JSON.parse(await getItem(WATER_IN_TAKE_GOAL)) ||
          calcDailyGoal(weight, activity)
      );
      setGender(gender);

      setWeight(weight);
      setAcitivty(activity);
    };
    getUserInfo();
  }, []);

  const handleLogout = async () => {
    const res = await clearStorage();
    handleAuthChange(false); // Update the authentication status to false
    navigation.navigate("Welcome");
    // Updates.reloadAsync();
  };

  useEffect(() => {
    const setData = () => {
      if (route.params && "weight" in route.params) {
        setWeight(route.params.weight);
      } else if (route.params && "activity" in route.params) {
        setAcitivty(route.params.activity);
      } else if (route.params && "waterIntake" in route.params) {
        setWaterInTake(route.params.waterIntake);
      }
    };
    setData();
  }, [route]);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Account</Text>
        <Ionicons name="settings-outline" size={24} color="gray" />
      </View>

      <View>
        <TouchableOpacity
          style={styles.editContainer}
          onPress={() => navigation.navigate("reminderSchedule")}
        >
          <View style={styles.tagContainer}>
            <Text style={styles.headTag}>Reminder Settings</Text>
            <Text style={styles.subTag}>Schedule</Text>
          </View>
          <Ionicons name="notifications-outline" size={24} color="gray" />
        </TouchableOpacity>
        <View style={styles.editContainer}>
          <View style={styles.tagContainer}>
            <Text style={styles.headTag}>Gender</Text>
            <Text style={styles.subTag}>{gender}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("genderScreen")}>
            <Feather name="edit-3" size={18} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.editContainer}>
          <View style={styles.tagContainer}>
            <Text style={styles.headTag}>Weight</Text>
            <Text style={styles.subTag}>{weight} kg</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("weightScreen", {
                weight: weight,
              })
            }
          >
            <Feather name="edit-3" size={18} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.editContainer}>
          <View style={styles.tagContainer}>
            <Text style={styles.headTag}>Water Intake Goal</Text>
            <Text style={styles.subTag}>{waterInTake} ml</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("waterInTakeScreen", {
                waterInTake: waterInTake,
              })
            }
          >
            <Feather name="edit-3" size={18} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.editContainer}>
          <View style={styles.tagContainer}>
            <Text style={styles.headTag}>Activity</Text>
            <Text style={styles.subTag}>{activity} min</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("activityScreen")}
          >
            <Feather name="edit-3" size={18} color="gray" />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.editContainer}>
          <View style={styles.tagContainer}>
            <Text style={styles.headTag}>Sleep Time</Text>
            <Text style={styles.subTag}>11:00 pm</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("sleepScheduleScreen", { type: "sleep" })
            }
          >
            <Feather name="edit-3" size={18} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.editContainer}>
          <View style={styles.tagContainer}>
            <Text style={styles.headTag}>Wake Up Time</Text>
            <Text style={styles.subTag}>06:00 am</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("sleepScheduleScreen", { type: "wake" })
            }
          >
            <Feather name="edit-3" size={18} color="gray" />
          </TouchableOpacity>
        </View> */}
      </View>
      <TouchableOpacity
        style={styles.reminderContainer}
        onPress={() => navigation.navigate("reminderSchedule")}
      >
        <Text style={styles.reminderText}>Scheduled Reminder</Text>
      </TouchableOpacity>

      <View style={styles.logoutContainer}>
        <Text style={styles.logoutText}>Logout</Text>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons name="logout" size={28} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingTop: 10,
    paddingHorizontal: 20,
    padding: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: "500",
    color: "#199AFE",
  },
  icon: {
    padding: 2,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  editContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  tagContainer: {
    padding: 2,
  },
  headTag: {
    fontSize: 20,
    fontWeight: "400",
  },
  subTag: {
    color: "#199AFE",
    paddingLeft: 2,
    paddingTop: 2,
    fontWeight: "bold",
  },
  reminderContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  reminderText: {
    color: "white",
    backgroundColor: "#199AFE",
    borderRadius: 30,
    paddingHorizontal: 35,
    paddingVertical: 20,
  },
  logoutContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    gap: 10,
    marginRight: 10,
    marginHorizontal: 20,
  },
  logoutText: {
    fontWeight: "500",
    fontSize: 22,
  },
});
export default Setting;
