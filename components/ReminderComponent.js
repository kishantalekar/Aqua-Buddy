import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Feather, EvilIcons } from "@expo/vector-icons";
import {
  checkScheduledNotifications,
  registerForPushNotificationsAsync,
  scheduleReminders,
} from "../notification/Notification";
import { getClosestReminder, getReminderTimes } from "../utils/helper";

import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  saveRemindingTimes,
  getRemindingTimes as getReminderTimesFromDB,
} from "../storage/database";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const ReminderComponent = () => {
  const [remindersScheduled, setRemindersScheduled] = useState(false);
  const [closestReminder, setClosestReminder] = useState(null);
  const [reminderTimes, setReminderTimes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let data = await getReminderTimesFromDB();

      if (!data || data.length == 0) {
        data = getReminderTimes();
        // console.log(data);
      }
      setReminderTimes(data);
      setClosestReminder(getClosestReminder(data));

      const scheduleRemindersIfNotScheduled = async () => {
        registerForPushNotificationsAsync();
        scheduleReminders(data);
        saveRemindingTimes(data);
        // Pass the reminderTimes array generated from the previous code
      };
      scheduleRemindersIfNotScheduled();
      checkScheduledNotifications();
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const scheduleRemindersIfNotScheduled = async () => {
  //     registerForPushNotificationsAsync();
  //     console.log(reminderTimes);
  //     scheduleReminders(reminderTimes);

  //     saveRemindingTimes(reminderTimes);
  //     // Pass the reminderTimes array generated from the previous code
  //   };

  //   const checkRemindersScheduled = async () => {
  //     const value = await AsyncStorage.getItem("remindersScheduled");
  //     console.log(value);

  //     scheduleRemindersIfNotScheduled();
  //   };
  //   checkRemindersScheduled();
  // }, []);

  // function to chech scheduled reminders
  useEffect(() => {
    checkScheduledNotifications();
  }, []);
  return (
    <TouchableOpacity>
      <View
        style={{
          backgroundColor: "white",
          marginHorizontal: 10,
          flexDirection: "row",
          marginTop: 5,
          height: 50,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            gap: 10,
          }}
        >
          <EvilIcons name="clock" size={30} color="black" />
          <View>
            {closestReminder === null ? (
              <Text style={{ fontWeight: 400, fontSize: 14 }}>
                Reminders unavailable
              </Text>
            ) : (
              <>
                <Text style={{ fontWeight: 600, fontSize: 18 }}>
                  {closestReminder?.time}
                </Text>
                <Text style={{ fontWeight: 400, fontSize: 14 }}>
                  next reminder
                </Text>
              </>
            )}
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            paddingRight: 24,
          }}
        >
          <Text
            style={{
              color: "gray",
              fontSize: 18,
              fontWeight: 400,
            }}
          >
            {closestReminder === null ? "" : "200ml"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReminderComponent;
