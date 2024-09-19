import { View, StyleSheet, Text } from "react-native";

import LQDPressAnimation from "../press-animation";
import { ILQDButton } from "./types";

const LQDButton = ({
  onPress,
  title,
  type = "button",
  variant = "primary",
  disabled,
  loading,
  style,
}: ILQDButton) => {
  return (
    <LQDPressAnimation onPress={onPress} style={[{ flex: 1 }, style]}>
      <View
        style={[
          styles.container,
          styles[`${variant}Container`],
          (styles as any)[`${variant}Shadow`],
        ]}
      >
        <Text style={styles[`${variant}Text`]}>{title}</Text>
      </View>
    </LQDPressAnimation>
  );
};

export default LQDButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryContainer: {
    paddingTop: 19,
    paddingBottom: 18,
    borderRadius: 50,
    backgroundColor: "#FFF",
  },
  primaryText: {
    fontSize: 16,
    lineHeight: 16,
    color: "#1A2001",
    fontFamily: "Clash-Display",
    fontWeight: "600",
  },
  primaryShadow: {
    shadowColor: "rgba(62, 62, 62, 0.04)",
    shadowOffset: { width: 0, height: -2.4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },

  secondaryContainer: {
    paddingVertical: 17,
    borderRadius: 50,
    backgroundColor: "#1A2001",
  },
  secondaryText: {
    fontSize: 16,
    lineHeight: 16,
    color: "#FFF",
    fontFamily: "Clash-Display",
    fontWeight: "600",
  },
  secondaryShadow: {
    // Shadow properties for iOS
    shadowColor: "#151906",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,

    // Border to simulate the third shadow layer
    borderWidth: 1,
    borderColor: "#556805",

    // Elevation for Android
    elevation: 3,
  },

  tertiaryContainer: {
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 16,
    backgroundColor: "#181E00",
    borderRadius: 6,
  },
  tertiaryText: {
    color: "#FFF",
    fontSize: 12,
    lineHeight: 15.84,
    fontWeight: "500",
  },

  tertiaryOutlineContainer: {
    height: 40,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 6,
  },
  tertiaryOutlineText: {
    color: "#334155",
    fontSize: 13,
    lineHeight: 16.12,
    fontWeight: "500",
  },
});
