import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useEffect } from "react";
import { monthlyAverage, weeklyAverage } from "../../utils/helper";
import { useState } from "react";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const DrinkWaterReport = ({ records }) => {
  const [weekly, setWeekly] = useState(0);
  const [monthly, setMonthly] = useState(0);

  useEffect(() => {
    const calculateWaterReport = () => {
      const weeklyData = Math.round(weeklyAverage(records));
      const monthlyData = Math.round(monthlyAverage(records));

      setMonthly(monthlyData);
      setWeekly(weeklyData);
    };
    calculateWaterReport();
  }, []);
  const navigation = useNavigation();
  return (
    <View style={{}}>
      <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
          <Ionicons
            name="chevron-back"
            size={24}
            color="black"
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 10,
              width: 30,
              padding: 2,
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontWeight: 600, fontSize: 18 }}>
          Drink Water report
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 15,
          marginHorizontal: 10,
          marginBottom: 15,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: "#2fbf35",
              borderRadius: 100,
            }}
          ></View>
          <Text style={{ fontWeight: 600, fontSize: 14 }}>Weekly average</Text>
        </View>

        <Text style={{ color: "#5bacfe", fontWeight: 500, fontSize: 14 }}>
          {weekly}ml/day
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: "#fe5059",
              borderRadius: 100,
            }}
          ></View>
          <Text style={{ fontWeight: 600, fontSize: 14 }}>Monthly average</Text>
        </View>

        <Text style={{ color: "#5bacfe", fontWeight: 500, fontSize: 14 }}>
          {monthly}ml/day
        </Text>
      </View>
    </View>
  );
};

export default DrinkWaterReport;
