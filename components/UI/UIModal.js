import { View, Text, Button } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

const UIModal = ({ isVisible, toggleModal }) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={toggleModal}
        hideModalContentWhileAnimating={true}
        // coverScreen={false}
        style={{}}
      >
        <View style={{ backgroundColor: "whitesmoke" }}>
          <Text>I am the modal content!</Text>
          <TouchableOpacity>
            <Text title="Hide Modal" onPress={toggleModal} style={styles.btn}>
              Hide Modal
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 20,
    backgroundColor: "#1a9aff",
    color: "white",
  },
});
export default UIModal;
