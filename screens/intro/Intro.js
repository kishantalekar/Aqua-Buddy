import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Gender from "./Gender/Gender";
import {
  ACTIVITY_SCREEN,
  GENDER_SCREEN,
  WEIGHT_SCREEN,
} from "../../constants/screen";
import Weight from "./Weight/Weight";
import Activity from "./Activity/Activity";
import { Octicons } from "@expo/vector-icons";
const Intro = () => {
  const [page, setPage] = useState(GENDER_SCREEN);

  const pageHandler = (pageName) => {
    setPage(pageName);
  };
  return (
    <View style={styles.container}>
      <View style={styles.activeContainer}>
        <Octicons
          name="dash"
          size={24}
          color={page == GENDER_SCREEN ? "#1599fb" : "gray"}
        />
        <Octicons
          name="dash"
          size={24}
          color={page == WEIGHT_SCREEN ? "#1599fb" : "gray"}
        />
        <Octicons
          name="dash"
          size={24}
          color={page == ACTIVITY_SCREEN ? "#1599fb" : "gray"}
        />
      </View>
      {page == GENDER_SCREEN && <Gender onNextPage={pageHandler} />}
      {page == WEIGHT_SCREEN && (
        <Weight onPrevPage={pageHandler} onNextPage={pageHandler} />
      )}
      {page == ACTIVITY_SCREEN && <Activity onPrevPage={pageHandler} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activeContainer: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "gray",
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 60,
    justifyContent: "center",
  },
});
export default Intro;
