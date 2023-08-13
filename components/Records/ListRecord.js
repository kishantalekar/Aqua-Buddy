import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

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
          elevation: 1,
          marginBottom: 3,
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
          <Text
            style={{ fontWeight: 500, fontSize: 16, fontFamily: "sans-serif" }}
          >
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
          <Text
            style={{
              color: "gray",
              fontSize: 16,
              fontWeight: 400,
              fontFamily: "sans-serif",
            }}
          >
            {item.ml} ml
          </Text>
          <Ionicons name="md-water-outline" size={20} color="#199AFE" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListRecord;
