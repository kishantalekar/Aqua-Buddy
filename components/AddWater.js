import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { CupOutline } from "./cups";

const AddWater = ({ handleClick }) => {
  return (
    <View
      style={{
        // backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      <TouchableOpacity style={styles.addButton} onPress={handleClick}>
        <AntDesign name="plus" size={18} color="white" />
        <Text style={{ color: "white", fontSize: 20 }}>Add Water</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  addButton: {
    alignItems: "center",
    backgroundColor: "#1a9aff",
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: "row",
    gap: 15,
  },
});
export default AddWater;
