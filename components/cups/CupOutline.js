import React from "react";
import { View, Text, StyleSheet } from "react-native";

function CupOutline() {
  return (
    <View style={styles.container}>
      <View style={styles.cupBody}>
        <View style={styles.cupTop} />
        <View style={styles.cupMiddle} />
        <View style={styles.cupBottom} />
      </View>
      <Text style={styles.cupHandle}>C</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  cupBody: {
    width: 100,
    height: 180,
    borderRadius: 50,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
  },
  cupTop: {
    width: 100,
    height: 60,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "black",
  },
  cupMiddle: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
  },
  cupBottom: {
    width: 80,
    height: 30,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "black",
    alignSelf: "center",
    marginTop: -15,
  },
  cupHandle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default CupOutline;
