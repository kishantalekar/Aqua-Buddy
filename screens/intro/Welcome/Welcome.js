import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  const goToGender = () => {
    navigation.navigate("Intro");
  };
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <View>
          <Text style={styles.welcomeHeading}>WATER </Text>
          <Text style={styles.welcomeHeading}>REMAINDER</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/waterBottle.png")}
            style={styles.welcomeImage}
          />
        </View>
      </View>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>
          Let me help you keep hydarted and healthy
        </Text>
        <Text style={styles.welcomeDescription}>
          In order to provide personalized hydration advice, the app must
          receive some background information. And that will be kept secret
        </Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={goToGender}>
        <Text style={styles.btn}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
  },
  welcomeContainer: {
    marginVertical: 20,
    width: "100%",
    marginTop: 60,
    paddingVertical: 20,
  },
  welcomeHeading: {
    fontSize: 90,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    color: "#199AFE",
    zIndex: 100,
  },
  imageContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  welcomeImage: {
    width: 200,
    height: 200,
    transform: [{ rotate: "-25deg" }],
  },
  welcomeTextContainer: {
    padding: 10,
    paddingHorizontal: 15,
    paddingBottom: 20,
    gap: 2,
  },
  welcomeText: {
    color: "#199AFE",
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
  welcomeDescription: {
    color: "gray",
    textAlign: "center",
    fontWeight: 400,
  },
  buttonContainer: {
    marginTop: 80,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#199AFE",
    borderRadius: 5,
  },
  btn: {
    color: "white",
    fontWeight: "500",
    fontSize: 22,
  },
});
export default Welcome;
