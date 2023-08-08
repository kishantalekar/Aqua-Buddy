import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const scheduleReminders = async (reminderTimes) => {
  clearScheduledNotifications();

  const now = new Date();

  for (const reminder of reminderTimes) {
    const timeParts = reminder.time.split(" ");
    const time = timeParts[0];
    const period = timeParts[1].toUpperCase();
    const [hours, minutes] = time.split(":");
    let hours24 = parseInt(hours);

    if (period === "PM" && hours24 !== 12) {
      hours24 += 12;
    } else if (period === "AM" && hours24 === 12) {
      hours24 = 0;
    }

    const reminderTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours24,
      parseInt(minutes)
    );
    // console.log(reminderTime.getHours(), reminderTime.getMinutes());
    if (reminder.enabled) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Drink Water Reminder",
          body: "Stay hydrated! It's time to drink water.",
          sound: true,
        },
        trigger: {
          hour: reminderTime.getHours(),
          minute: reminderTime.getMinutes(),
          repeats: true,
        },
      });
    }
  }

  // Set the flag indicating reminders have been scheduled
  await AsyncStorage.setItem("remindersScheduled", "true");
  // setRemindersScheduled(true);
};

export const checkScheduledNotifications = async () => {
  const scheduledNotifications =
    await Notifications.getAllScheduledNotificationsAsync();

  if (scheduledNotifications.length > 0) {
    const reminderTimes = scheduledNotifications.map((notification) => {
      const hour = notification.trigger.hour;
      const minute = notification.trigger.minute;
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;

      return time;
    });
  } else {
    console.log("No scheduled notifications found.");
  }
};

export const clearScheduledNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
