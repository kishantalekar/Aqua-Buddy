import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { getRemindingTimes, saveRemindingTimes } from "../../storage/database";
import DateTimePicker from "@react-native-community/datetimepicker";
import RemindingTime from "../../components/RemindingTime";
import { scheduleReminders } from "../../notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { addRemindingTimes } from "../../features/reminderSlicd";

const ReminderScheduleScreen = () => {
  const navigation = useNavigation();
  const [remindingTimes, setRemindingTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const dispatch = useDispatch();
  const getData = async () => {
    const data = await getRemindingTimes();

    setRemindingTimes(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleTimeChange = (event, selected) => {
    setShowPicker(false);
    if (selected) {
      setSelectedTime(selected);
      handleAddReminder(selected);
    }
  };
  const handleAddReminder = (selected) => {
    // console.log(selectedTime);
    let formattedTime = selected.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    formattedTime = formattedTime.replace("am", "AM").replace("pm", "PM");
    if (formattedTime.length === 7) {
      formattedTime = "0" + formattedTime;
    }

    const newReminder = {
      id: Math.random().toString(),
      time: formattedTime,
      enabled: true,
    };

    const updatedReminders = [...remindingTimes, newReminder];

    setRemindingTimes(updatedReminders);

    saveRemindingTimes(updatedReminders);
    scheduleReminders(updatedReminders);
  };

  const showTimePicker = () => {
    setShowPicker(true);
  };
  const handleToggle = (id, isOn) => {
    // Update the enabled status of the corresponding reminder item with the given id
    const updatedReminders = remindingTimes.map((reminder) =>
      reminder.id === id ? { ...reminder, enabled: isOn } : reminder
    );

    // Save the updated reminder times
    setRemindingTimes(updatedReminders);
    saveRemindingTimes(updatedReminders);
    scheduleReminders(updatedReminders);
  };
  const handleDelete = (id) => {
    const updatedReminders = remindingTimes.filter(
      (reminder) => reminder.id !== id
    );
    setRemindingTimes(updatedReminders);
    saveRemindingTimes(updatedReminders);
    scheduleReminders(updatedReminders);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "#3ba2ff",
          paddingHorizontal: 15,
          paddingTop: 50,
          paddingBottom: 10,
          flexDirection: "row",
          gap: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 24, fontWeight: 500 }}>
          Reminder schedule
        </Text>
      </View>
      <ScrollView>
        <Text
          style={{
            color: "gray",
            fontWeight: 400,
            fontSize: 14,
            marginVertical: 30,
            marginHorizontal: 15,
          }}
        >
          We will optimize reminder time based on your record history
        </Text>
        <View>
          {remindingTimes?.map((item, i) => (
            <RemindingTime
              item={item}
              i={i}
              key={item.id}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          zIndex: 99,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: "#3ba2ff",
            padding: 15,
          }}
          onPress={showTimePicker}
        >
          <Ionicons name="add-outline" size={28} color="white" />
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>
    </View>
  );
};

export default ReminderScheduleScreen;
