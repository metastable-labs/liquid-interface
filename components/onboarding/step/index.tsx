import { Text, View, StyleSheet, Image } from "react-native";
import { ILQDOnboardingStep } from "./types";

const LQDOnboardingStep = ({
  ray,
  image,
  title,
  subtitle,
  containerStyle,
  imageStyle,
  titleStyle,
  subtitleStyle,
}: ILQDOnboardingStep) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={ray} style={styles.ray} />

      <Text style={[styles.title, titleStyle]}>{title}</Text>

      <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>

      <Image
        source={image}
        style={[styles.image, imageStyle]}
        resizeMode="contain"
      />
    </View>
  );
};

export default LQDOnboardingStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 136,
    gap: 22,
  },

  ray: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },

  title: {
    fontFamily: "Clash-Display",
    fontSize: 48,
    fontWeight: "700",
    lineHeight: 53,
    letterSpacing: -0.96,
    paddingHorizontal: 16,
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 22.32,
    paddingHorizontal: 16,
  },

  image: {
    position: "absolute",
  },
});
