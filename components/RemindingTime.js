import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ToggleSwitch from "toggle-switch-react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Animated } from "react-native";
const RemindingTime = ({ item, i, handleToggle, handleDelete }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteContainerHeight, setDeleteContainerHeight] = useState(
    new Animated.Value(0)
  );
  const toggleDeleteContainer = () => {
    if (openDelete) {
      Animated.timing(deleteContainerHeight, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start(() => setOpenDelete(false));
    } else {
      setOpenDelete(true);
      Animated.timing(deleteContainerHeight, {
        toValue: 40,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View key={item.id} style={{ marginBottom: 15 }}>
      <View
        key={item.id}
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginHorizontal: 25,
        }}
      >
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: 500, fontSize: 24 }}>{item.time}</Text>
          <Text style={{ color: "gray", fontSize: 12 }}>Everyday</Text>
          {openDelete ? (
            <Animated.View style={{ height: deleteContainerHeight }}>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  padding: 2,
                  // backgroundColor: "red",
                }}
                onPress={() => handleDelete(item.id)}
              >
                <Text
                  style={{
                    color: "#FE0000",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <></>
          )}
        </View>
        <View style={{ alignItems: "center", gap: 10 }}>
          <ToggleSwitch
            isOn={item.enabled}
            onColor="#3ba2ff"
            offColor="gray"
            size="small"
            onToggle={(isOn) => handleToggle(item.id, isOn)}
          />
          {!openDelete ? (
            <TouchableOpacity onPress={toggleDeleteContainer}>
              <Ionicons name="chevron-down" size={24} color="gray" />
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity onPress={toggleDeleteContainer}>
                <Ionicons name="chevron-up" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {i % 2 != 0 ? (
        <></>
      ) : (
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 0.8,
            marginHorizontal: 30,
            marginTop: 14,
          }}
        ></View>
      )}
    </View>
  );
};

export default RemindingTime;
