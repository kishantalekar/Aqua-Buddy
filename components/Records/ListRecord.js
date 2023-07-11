import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

const ListRecord = ({ item }) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          backgroundColor: "white",
          marginHorizontal: 10,
          flexDirection: "row",
          marginTop: 5,
          borderRadius: 10,
          // backgroundColor: "red",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/cup1.jpeg")}
            style={{ height: 50, width: 50, borderRadius: 10 }}
          />
          <Text style={{ fontWeight: 500, fontSize: 18 }}>
            {item.displayTime}
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Text style={{ color: "gray", fontSize: 18, fontWeight: 400 }}>
            {item.ml} ml
          </Text>
          <Feather name="more-vertical" size={20} color="gray" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListRecord;
