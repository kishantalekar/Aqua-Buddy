import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    backgroundColor: "white",
  },

  image: {
    backgroundColor: "gray",
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: "white",
  },

  headerText: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#1a9aff",
  },

  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  addButton: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default styles;
