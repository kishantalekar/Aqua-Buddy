import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { RotateInDownLeft } from "react-native-reanimated";

const Suggestions = () => {
  const [randomSuggestion, setRandomSuggestion] = useState("");
  const SuggestionsText = [
    "Hold the water in your mouth for a while before swallowing",
    "A healthy mind and body is a hydrated one. Come and have a try",
    "Drinking water in a sitting posture is better than in a standing or running position",
    "Take small sips of water throughout the day to stay hydrated",
    "Drinking water before meals can help with digestion",
    "Carry a water bottle with you wherever you go for easy access to hydration",
    "Hydrate your body with water, not sugary drinks",
    "Set reminders to drink water at regular intervals to stay on track",
    "Drinking water can help improve your skin complexion",
    "Stay hydrated during workouts to maximize your performance",
    "Replace sugary beverages with water for a healthier lifestyle",
    "Drinking water can help reduce the feeling of fatigue",
    "Drink a glass of water first thing in the morning to kickstart your day",
    "Stay hydrated to support your body's natural detoxification process",
    "Drinking enough water can help prevent muscle cramps",
    "Stay hydrated to maintain a healthy balance of fluids in your body",
  ];
  function getRandomSuggestion() {
    const randomIndex = Math.floor(Math.random() * SuggestionsText.length);
    return SuggestionsText[randomIndex];
  }

  // Usage:
  useEffect(() => {
    setRandomSuggestion(getRandomSuggestion());
  }, []);

  return (
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 10,
        marginTop: 10,
        paddingTop: 10,
        gap: 10,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        position: "relative",
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#d3e9f8",
          borderRadius: 20,
          padding: 10,
          position: "relative",
        }}
      >
        <Text style={{ color: "black", fontWeight: 400, fontSize: 14 }}>
          {randomSuggestion}
        </Text>
        <View
          style={{
            position: "absolute",
            top: 15,
            right: -5,
            width: 0,
            height: 0,
            borderLeftWidth: 20,
            borderBottomWidth: 20,
            borderLeftColor: "transparent",
            borderBottomColor: "red",
            borderTopEndRadius: 20,
            zIndex: 22,
            backgroundColor: "#d3e9f8",
            transform: [{ rotate: "220deg" }],
          }}
        ></View>
      </View>
      <Image
        source={require("../assets/waterDroplet.png")}
        // style={styles.image}
        style={{ height: 70, width: 70 }}
      />
    </View>
  );
};

export default Suggestions;
